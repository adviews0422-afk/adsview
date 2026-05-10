'use client'
import { TrendingUp } from 'lucide-react'
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
const chartData = [
  { month: 'January', desktop: 186 },
  { month: 'February', desktop: 305 },
  { month: 'March', desktop: 237 },
  { month: 'April', desktop: 73 },
  { month: 'May', desktop: 209 },
  { month: 'June', desktop: 214 },
  { month: 'August', desktop: 73 },
  { month: 'September', desktop: 209 },
  { month: 'October', desktop: 214 },
  { month: 'November', desktop: 214 },
  { month: 'December', desktop: 209 },
]

const chartConfig = {
  desktop: {
    label: 'Desktop',
    color: 'red',
  },
} satisfies ChartConfig

function Dashboard() {
  return (
    <div className='w-full'>
      <div className='grid col-span-1 md:grid-cols-3'>
        <div className=' rounded border bg-white p-5 col-span-1 m-3'>
          <p className='text-sm text-gray-600'>Total Revenue</p>
          <p className='text-3xl text-gray-600 my-2'>P120,000</p>
          <p className='text-xs text-gray-600'>T20.1% from last month</p>
        </div>
        <div className=' rounded border bg-white p-5 col-span-1 m-3'>
          <p className='text-sm text-gray-600'>Todays Sale</p>
          <p className='text-3xl text-gray-600 my-2'>+120,000</p>
          <p className='text-xs text-gray-600'>T20.1% from last month</p>
        </div>
        <div className=' rounded border bg-white p-5 col-span-1 m-3'>
          <p className='text-sm text-gray-600'>Total Revenue</p>
          <p className='text-3xl text-gray-600 my-2'>P120,000</p>
          <p className='text-xs text-gray-600'>T20.1% from last month</p>
        </div>
      </div>
      <div className='grid grid-cols-1 xl:grid-cols-2 w-full '>
        <div className='col-span-1 m-3 border'>
          <Card>
            <CardHeader>
              <CardTitle className='text-gray-600'>Bar Chart</CardTitle>
              <CardDescription className='text-gray-600'>January - June 2024</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig}>
                <BarChart accessibilityLayer data={chartData}>
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey='month'
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    tickFormatter={(value) => value.slice(0, 3)}
                  />
                  <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                  <Bar dataKey='desktop' fill='var(--color-desktop)' radius={8} />
                </BarChart>
              </ChartContainer>
            </CardContent>
            <CardFooter className='flex-col items-start gap-2 text-sm'>
              <div className='flex gap-2 font-medium leading-none'>
                Trending up by 5.2% this month <TrendingUp className='h-4 w-4' />
              </div>
              <div className='leading-none text-muted-foreground'>
                Showing total visitors for the last 6 months
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
