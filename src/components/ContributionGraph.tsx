import { ContributionCalendar } from 'react-contribution-calendar'

function ContributionGraph({dataGHchart} : any) {
  return (
    <ContributionCalendar
      data={dataGHchart}
      dateOptions={{
        start: '2022-01-01',
        end: '2023-01-01',
        daysOfTheWeek: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        startsOnSunday: true,
        includeBoundary: true,
      }}
      styleOptions={{
        theme: 'grass',
        cx: 10,
        cy: 10,
        cr: 2,
      }}
      visibilityOptions={{
        hideDescription: false,
        hideMonthLabels: false,
        hideDayLabels: false,
      }}
      scroll={false}
    />
  )
}

export default ContributionGraph