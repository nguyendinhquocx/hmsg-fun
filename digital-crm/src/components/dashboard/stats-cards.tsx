'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Building2, TrendingUp, TrendingDown } from 'lucide-react'

interface StatsData {
  totalCompanies: number
  companiesThisMonth: number
  growthPercentage: number
  isGrowthPositive: boolean
}

export default function StatsCards() {
  const [stats, setStats] = useState<StatsData>({
    totalCompanies: 0,
    companiesThisMonth: 0,
    growthPercentage: 0,
    isGrowthPositive: true
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Get current month and year
        const now = new Date()
        const currentMonth = now.getMonth()
        const currentYear = now.getFullYear()
        const startOfMonth = new Date(currentYear, currentMonth, 1)
        const startOfLastYearMonth = new Date(currentYear - 1, currentMonth, 1)
        const endOfLastYearMonth = new Date(currentYear - 1, currentMonth + 1, 0)

        // Total companies
        const { count: totalCompanies } = await supabase
          .from('companies')
          .select('*', { count: 'exact', head: true })
          .eq('team', 'CHC')

        // Companies this month
        const { count: companiesThisMonth } = await supabase
          .from('companies')
          .select('*', { count: 'exact', head: true })
          .eq('team', 'CHC')
          .gte('created_at', startOfMonth.toISOString())

        // Companies same month last year
        const { count: companiesLastYearMonth } = await supabase
          .from('companies')
          .select('*', { count: 'exact', head: true })
          .eq('team', 'CHC')
          .gte('created_at', startOfLastYearMonth.toISOString())
          .lte('created_at', endOfLastYearMonth.toISOString())

        // Calculate growth percentage
        let growthPercentage = 0
        let isGrowthPositive = true

        if (companiesLastYearMonth && companiesLastYearMonth > 0) {
          growthPercentage = ((companiesThisMonth || 0) - companiesLastYearMonth) / companiesLastYearMonth * 100
          isGrowthPositive = growthPercentage >= 0
        } else if (companiesThisMonth && companiesThisMonth > 0) {
          growthPercentage = 100
          isGrowthPositive = true
        }

        setStats({
          totalCompanies: totalCompanies || 0,
          companiesThisMonth: companiesThisMonth || 0,
          growthPercentage: Math.abs(growthPercentage),
          isGrowthPositive
        })
      } catch (error) {
        console.error('Error fetching stats:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchStats()
  }, [])

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white overflow-hidden shadow rounded-lg animate-pulse">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="h-8 w-8 bg-gray-200 rounded"></div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-8 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  const cards = [
    {
      title: 'Tổng số công ty',
      value: stats.totalCompanies,
      icon: Building2,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      title: 'Công ty tháng này',
      value: stats.companiesThisMonth,
      icon: Building2,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      title: 'Tăng trưởng cùng kỳ',
      value: `${stats.isGrowthPositive ? '+' : '-'}${stats.growthPercentage.toFixed(1)}%`,
      icon: stats.isGrowthPositive ? TrendingUp : TrendingDown,
      color: stats.isGrowthPositive ? 'text-green-600' : 'text-red-600',
      bgColor: stats.isGrowthPositive ? 'bg-green-100' : 'bg-red-100'
    }
  ]

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
      {cards.map((card, index) => (
        <div key={index} className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className={`p-2 rounded-md ${card.bgColor}`}>
                  <card.icon className={`h-6 w-6 ${card.color}`} />
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    {card.title}
                  </dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900">
                      {card.value}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}