import { Entity, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Appointment } from '../appointments/appointment.entity';
import { User } from '../users/user.entity';

@Entity({ name: 'appointment_employees' })
export class AppointmentEmployee {
  @PrimaryColumn({ name: 'appointment_id' })
  appointmentId: number;

  @PrimaryColumn({ name: 'employee_id' })
  employeeId: number;

  // Relación con Appointment
  @ManyToOne(() => Appointment, (appointment) => appointment.appointmentEmployees, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'appointment_id' })
  appointment: Appointment;

  // Relación con User (empleado)
  @ManyToOne(() => User, (user) => user.appointmentEmployees, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'employee_id' })
  employee: User;
}
