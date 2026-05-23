'use client'

import * as z from 'zod'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
} from '@/components/ui/form'

import { ConversionSchema } from '@/utils/validation/schemas'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { ConversionInitialValues } from '@/utils/validation/initialValues'

import {
  useGetConvertionQuery,
  useUpdateWithdrawalSettingsMutation,
} from '@/store/action/dashboardAction'

import toast from 'react-hot-toast'
import { Label } from '../ui/label'

export default function WithdrawalSettingsForm() {
  const {
    data: convertionData,
    isLoading: isFetchingConvertion,
    refetch,
  } = useGetConvertionQuery({})

  const [updateWithdrawalSettings, { isLoading }] = useUpdateWithdrawalSettingsMutation()

  const form = useForm<z.infer<typeof ConversionSchema>>({
    resolver: zodResolver(ConversionSchema),
    defaultValues: ConversionInitialValues,
  })

  useEffect(() => {
    refetch()
  }, [])

  useEffect(() => {
    if (convertionData?.data) {
      form.reset({
        coins: convertionData.data.coins,
        convertion: convertionData.data.convertion,
        manual: convertionData.data.manual ?? false,
      })
    }
  }, [convertionData, form])

  const onSubmit = async (values: z.infer<typeof ConversionSchema>) => {
    const reponse = await updateWithdrawalSettings({
      coins: Number(values.coins),
      convertion: Number(values.convertion),
      manual: values.manual,
    }).unwrap()

    if (reponse.status === 200) {
      toast.success('Successfully updated!')
    } else {
      toast.error('Something went wrong, please try again')
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className='gap-4'>
          <div className='flex flex-row gap-4 mb-4'>
            <FormField
              control={form.control}
              name='coins'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Coins</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={isFetchingConvertion} />
                  </FormControl>
                  <FormMessage className='text-xs' />
                </FormItem>
              )}
            />

            <span className='mt-10'>=</span>

            <FormField
              control={form.control}
              name='convertion'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Conversion</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={isFetchingConvertion} />
                  </FormControl>
                  <FormMessage className='text-xs' />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name='manual'
            render={({ field }) => (
              <FormItem className='flex flex-row items-center justify-between rounded-lg border border-primary/20 p-4 mb-4'>
                <div className='space-y-0.5 flex flex-col'>
                  <Label size={'md'}>Manual Withdrawal</Label>
                  <Label size={'xs'}>Enable manual withdrawal approval</Label>
                </div>

                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    disabled={isFetchingConvertion}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <Button type='submit' disabled={isLoading}>
            {isLoading ? 'Saving...' : 'Save'}
          </Button>
        </div>
      </form>
    </Form>
  )
}
