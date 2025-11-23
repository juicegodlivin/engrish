'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card'
import { Input } from '~/components/ui/input'
import { Textarea } from '~/components/ui/textarea'
import { Button } from '~/components/ui/button'
import { Label } from '~/components/ui/label'
import { LoadingSpinner } from '~/components/ui/loading-spinner'
import { trpc } from '~/lib/trpc'
import { updateProfileSchema, type UpdateProfileInput } from '~/lib/validations'
import { formatWalletAddress } from '~/lib/utils'
import type { Database } from '~/types/database'

type UserProfile = Database['public']['Tables']['users']['Row']

export default function ProfilePage() {
  const { data: profile, isLoading } = trpc.user.getProfile.useQuery()
  const utils = trpc.useContext()
  
  const userProfile: UserProfile | undefined = profile as UserProfile | undefined

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateProfileInput>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      name: userProfile?.name || '',
      bio: userProfile?.bio || '',
    },
  })

  const updateMutation = trpc.user.updateProfile.useMutation({
    onSuccess: () => {
      utils.user.getProfile.invalidate()
    },
  })

  const onSubmit = (data: UpdateProfileInput) => {
    updateMutation.mutate(data)
  }

  if (isLoading) {
    return (
      <div className="p-8">
        <LoadingSpinner size="lg" text="Loading profile..." />
      </div>
    )
  }

  return (
    <div className="p-8 max-w-3xl mx-auto space-y-8 min-h-screen">
      <div>
        <h1 className="text-4xl font-bold font-display text-gradient-red">
          Profile Settings
        </h1>
        <p className="text-gray-400 mt-2">
          Manage your account information and preferences
        </p>
      </div>

      {/* Wallet Info (Read-only) */}
      <Card>
        <CardHeader>
          <CardTitle>Wallet Address</CardTitle>
          <CardDescription>
            Your primary identifier (cannot be changed)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="p-4 bg-background-darker rounded-xl font-mono text-sm text-brand-gold-400">
            {userProfile?.wallet_address || 'Not connected'}
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Short: {userProfile?.wallet_address ? formatWalletAddress(userProfile.wallet_address) : 'N/A'}
          </p>
        </CardContent>
      </Card>

      {/* Profile Form */}
      <Card>
        <CardHeader>
          <CardTitle>Public Profile</CardTitle>
          <CardDescription>
            This information will be visible to other users
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Display Name</Label>
              <Input
                id="name"
                {...register('name')}
                placeholder="Enter your name"
              />
              {errors.name && (
                <p className="text-sm text-red-400">{errors.name.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                {...register('bio')}
                placeholder="Tell us about yourself..."
                rows={4}
              />
              {errors.bio && (
                <p className="text-sm text-red-400">{errors.bio.message}</p>
              )}
            </div>

            <Button
              type="submit"
              disabled={updateMutation.isLoading}
              size="lg"
            >
              {updateMutation.isLoading ? 'Saving...' : 'Save Changes'}
            </Button>

            {updateMutation.isSuccess && (
              <p className="text-sm text-green-400">
                Profile updated successfully! 🎉
              </p>
            )}

            {updateMutation.error && (
              <p className="text-sm text-red-400">
                Error: {updateMutation.error.message}
              </p>
            )}
          </form>
        </CardContent>
      </Card>

      {/* Account Stats */}
      <Card>
        <CardHeader>
          <CardTitle>Account Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-400">Member Since:</span>
            <span className="text-white">
              {userProfile?.created_at ? new Date(userProfile.created_at).toLocaleDateString() : 'N/A'}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Twitter Linked:</span>
            <span className="text-white">
              {userProfile?.twitter_username ? `@${userProfile.twitter_username}` : 'Not linked'}
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

