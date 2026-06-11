'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { randomBytes } from 'crypto'

export async function createClan(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const name = formData.get('name') as string
  const inviteCode = randomBytes(4).toString('hex') // Genereaza un cod scurt

  // 1. Creeaza clanul
  const { data: clan, error: clanError } = await supabase
    .from('clans')
    .insert([
      { name, owner_id: user.id, invite_code: inviteCode }
    ])
    .select()
    .single()

  if (clanError || !clan) {
    console.error('Error creating clan:', clanError)
    // Handle error (ar trebui afisata in UI ideal)
    return
  }

  // 2. Adauga owner-ul ca membru automat
  const { error: memberError } = await supabase
    .from('clan_members')
    .insert([
      { clan_id: clan.id, user_id: user.id }
    ])

  if (memberError) {
    console.error('Error joining own clan:', memberError)
  }

  revalidatePath('/clans')
  redirect(`/clans/${clan.id}`)
}

export async function joinClan(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const inviteCode = formData.get('invite_code') as string

  // Cauta clanul
  const { data: clan, error: findError } = await supabase
    .from('clans')
    .select('id')
    .eq('invite_code', inviteCode)
    .single()

  if (findError || !clan) {
    console.error('Invalid invite code:', findError)
    return // Aici ar trebui un redirect catre o pagina cu eroare
  }

  // Adauga user-ul in clan
  const { error: joinError } = await supabase
    .from('clan_members')
    .insert([
      { clan_id: clan.id, user_id: user.id }
    ])

  if (joinError) {
    // Posibil e deja in clan (constraint unic)
    console.error('Error joining clan (already member?):', joinError)
  }

  revalidatePath('/clans')
  redirect(`/clans/${clan.id}`)
}
