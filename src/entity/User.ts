import { 
    Entity, 
    Column, 
    PrimaryGeneratedColumn
} from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    user_id: number;

    @Column()
    name: string;

    @Column()
    username: string;

    @Column()
    password: string;
};