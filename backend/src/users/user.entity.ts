import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    phone: string;

    @Column({ nullable: true })
    email: string;

    @Column({ nullable: true })
    full_name: string;

    @Column({ default: 'PENDING' })
    kyc_status: string;

    @CreateDateColumn()
    created_at: Date;
}

@Entity('user_behavior')
export class UserBehavior {
    @PrimaryGeneratedColumn('uuid')
    user_id: string;

    @Column('decimal', { precision: 5, scale: 2 })
    volatility_tolerance_score: number;

    @Column('decimal', { precision: 5, scale: 2 })
    liquidity_sensitivity_score: number;

    @Column({ default: 'AUTO_WITH_APPROVAL' })
    control_preference: string;
}
