import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function GET(request: Request) {
  // 1. Verificam ca request-ul vine de la Vercel Cron (Securitate)
  const authHeader = request.headers.get('authorization')
  if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new NextResponse('Unauthorized', { status: 401 })
  }

  // 2. Initializam Supabase cu Service Role Key (are drepturi de admin)
  // Pentru acest script avem nevoie de NEXT_PUBLIC_SUPABASE_URL si SUPABASE_SERVICE_ROLE_KEY
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !supabaseServiceKey) {
    return new NextResponse('Missing Supabase Config', { status: 500 })
  }

  const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey)

  try {
    // ====================================================================
    // A. PRELUAREA MECIURILOR DIN API
    // ====================================================================
    
    // Exemplu pentru football-data.org (Mondial 2026 sau alta competitie)
    /*
    const response = await fetch('https://api.football-data.org/v4/competitions/WC/matches?status=FINISHED', {
      headers: { 'X-Auth-Token': process.env.FOOTBALL_API_KEY! }
    })
    const data = await response.json()
    const finishedMatchesFromApi = data.matches;
    */

    // MOCK DATA pentru testare
    const finishedMatchesFromApi = [
      {
        id: 1, // ID unic al meciului
        status: 'FINISHED',
        score: { fullTime: { home: 2, away: 1 } }
      }
    ]

    // ====================================================================
    // B. ACTUALIZAREA SCORURILOR IN BAZA DE DATE SI CALCULAREA PUNCTELOR
    // ====================================================================

    for (const match of finishedMatchesFromApi) {
      if (match.status === 'FINISHED') {
        const homeScore = match.score.fullTime.home
        const awayScore = match.score.fullTime.away

        // 1. Actualizam meciul in baza de date
        await supabaseAdmin
          .from('matches')
          .update({ 
            home_score: homeScore, 
            away_score: awayScore, 
            status: 'FINISHED',
            updated_at: new Date().toISOString()
          })
          .eq('id', match.id)

        // 2. Cautam toate predictiile pentru acest meci care NU au fost inca punctate
        const { data: predictions } = await supabaseAdmin
          .from('predictions')
          .select('*')
          .eq('match_id', match.id)
          .is('points_awarded', null) // Doar cele necalculate inca

        if (predictions && predictions.length > 0) {
          // 3. Calculam punctele pentru fiecare predictie
          const realWinner = homeScore > awayScore ? 'HOME' : homeScore < awayScore ? 'AWAY' : 'DRAW'

          for (const pred of predictions) {
            let points = 0
            
            const predWinner = pred.predicted_home_score > pred.predicted_away_score ? 'HOME' : 
                               pred.predicted_home_score < pred.predicted_away_score ? 'AWAY' : 'DRAW'

            // Verificam scor perfect
            if (pred.predicted_home_score === homeScore && pred.predicted_away_score === awayScore) {
              points = 3
            } 
            // Verificam rezultat corect (Cine bate sau egal)
            else if (realWinner === predWinner) {
              points = 1
            }

            // 4. Salvam punctele
            await supabaseAdmin
              .from('predictions')
              .update({ points_awarded: points })
              .eq('id', pred.id)
          }
        }
      }
    }

    return NextResponse.json({ success: true, message: 'Scoruri si puncte actualizate cu succes' })

  } catch (error) {
    console.error('Eroare Cron Job:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
