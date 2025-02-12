import { ViewEntity, ViewColumn } from 'typeorm';

@ViewEntity({
  name: 'company_statistics_view',
  expression: `
    SELECT 
      c.id AS company_id,
      COUNT(a.id) AS total_appointments,
      SUM(CASE WHEN a.status = 'completed' THEN 1 ELSE 0 END) AS completed_appointments,
      SUM(CASE WHEN a.status = 'canceled' THEN 1 ELSE 0 END) AS canceled_appointments,
      AVG(r.rating) AS average_rating,
      COUNT(DISTINCT a.client_id) AS active_clients
    FROM companies c
    LEFT JOIN appointments a ON c.id = a.company_id
    LEFT JOIN reviews r ON c.id = r.company_id
    GROUP BY c.id
  `,
})
export class CompanyStatisticsView {
  @ViewColumn()
  company_id: number;

  @ViewColumn()
  total_appointments: number;

  @ViewColumn()
  completed_appointments: number;

  @ViewColumn()
  canceled_appointments: number;

  @ViewColumn()
  average_rating: number;

  @ViewColumn()
  active_clients: number;
}
