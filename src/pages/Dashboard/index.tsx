import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { isToday, format } from 'date-fns';
import {ptBr} from 'date-fns/locale/pt-br';
import DayPicker, { DayModifiers } from 'react-day-picker';
import 'react-day-picker/lib/style.css';

import { useAuth } from '../../hooks/auth';

import api from '../../services/api';

import logoimg from '../../assets/logo.svg';
import { FiPower, FiClock } from 'react-icons/fi';

import { Container,
         Header,
         HeaderContent,
         Profile,
         Content,
         Schedule,
         Calendar,
         NextAppointment,
         Section,
         Appointment,
         } from './styles';

interface MonthAvailabilityItem {
    day: number;
    available: boolean;
}

interface Appointment {
    id: string;
    date:string;
    user: {
        name: string;
        avatar_url: string;
    }
}

const Dashboard: React.FC = () => {
    const {signOut, user} = useAuth();

    const [selectedDate, setSelectedDate] = useState(new Date());

    const [currentMonth, setCurrentMonth] = useState(new Date());

    const [monthAvailability, setMonthAvailability] = useState<MonthAvailabilityItem[]>([]);

    const [appointments, setAppointments] = useState<Appointment[]>([]);   

    const handleDateChange = useCallback((day: Date, modifiers: DayModifiers) => {
        if (modifiers.available) {
            setSelectedDate(day);
        }
        },
        [],
    );

    const handleMonthChange = useCallback((month: Date) => {
        setCurrentMonth(month);
    }, []);

    useEffect(() => {
        api.get(`/providers/${user.id}/month-availability`, {
            params: {
                year: currentMonth.getFullYear(),
                month: currentMonth.getMonth() + 1,
            },
        }).then(response => {
            setMonthAvailability(response.data);
        })
    },[currentMonth, user.id]);

    useEffect(() => {
        api.get('/appointments/me', {
            params: {
                year: selectedDate.getFullYear(),
                month: selectedDate.getMonth() + 1,
                day: selectedDate.getDate(),
            }
        }).then(response => {
            setAppointments(response.data);
        })
    }, [selectedDate]);

    const disabledDays = useMemo(() => {
        const dates = monthAvailability
        .filter(monthDay => monthDay.available === false)
        .map(monthDay => {
            const year = currentMonth.getFullYear();
            const month = currentMonth.getMonth();

            return new Date(year, month, monthDay.day);
        });

        return dates;
    }, [currentMonth, monthAvailability]);

    const selectDateAsText = useMemo(() => {
        return format(selectedDate, "'Dia' dd 'de' MMMM", {
            locale: ptBr
        })
    }, [selectedDate]);

    const selectedWeekDay = useMemo(() => {
        return format(selectedDate, 'cccc', { locale: ptBR });
    }, [selectedDate]);

    return (
        <Container>
        <Header>
            <HeaderContent>
                <img src={logoimg} alt="GoBarber"/>

                <Profile>
                    <img
                        src={user.avatar_url}
                        alt={user.name}
                    />
                    <div>
                        <span>Bem-Vindo</span>
                        <strong>{user.name}</strong>
                    </div>
                </Profile>

                <button type="button" onClick={signOut}>
                    <FiPower />
                </button>

            </HeaderContent>
        </Header>

        <Content>
            <Schedule>
                <h1>Horários agendados</h1>
                <p>
                    {isToday(selectedDate) && <span>Hoje</span> }
                    <span>{selectDateAsText}</span>
                    <span>{selectedWeekDay}</span>
                </p>

                <NextAppointment>
                    <strong>Atendimento a seguir</strong>
                    <div>
                        <img src="https://avatars1.githubusercontent.com/u/51330232?s=460&u=6ba8934526e00197814cbcb559bf3cbff771b565&v=4" alt="Marquis Alexander"/>

                        <strong>Marquis Alexander</strong>
                        <span>
                            <FiClock />
                            08:00
                        </span>
                    </div>
                </NextAppointment>

                <Section>
                    <strong>Manhã</strong>

                    <Appointment>
                        <span>
                            <FiClock />
                            08:00
                            <div>
                        <img src="https://avatars1.githubusercontent.com/u/51330232?s=460&u=6ba8934526e00197814cbcb559bf3cbff771b565&v=4" alt="Marquis Alexander"/>
                        
                        <strong>Marquis Alexander</strong>
                            </div>
                        </span>
                    </Appointment>

                    <Appointment>
                        <span>
                            <FiClock />
                            08:00
                            <div>
                        <img src="https://avatars1.githubusercontent.com/u/51330232?s=460&u=6ba8934526e00197814cbcb559bf3cbff771b565&v=4" alt="Marquis Alexander"/>
                        
                        <strong>Marquis Alexander</strong>
                            </div>
                        </span>
                    </Appointment>
                </Section>

                <Section>
                    <strong>Tarde</strong>

                    <Appointment>
                        <span>
                            <FiClock />
                            08:00
                            <div>
                        <img src="https://avatars1.githubusercontent.com/u/51330232?s=460&u=6ba8934526e00197814cbcb559bf3cbff771b565&v=4" alt="Marquis Alexander"/>
                        
                        <strong>Marquis Alexander</strong>
                            </div>
                        </span>
                    </Appointment>
                </Section>
            </Schedule>

            <Calendar>
                <DayPicker 
                    weekdaysShort={['D', 'S', 'T', 'Q', 'Q', 'S', 'S']}
                    fromMonth={new Date()}
                    disabledDays={[
                        { daysOfWeek: [0, 6]},
                        ...disabledDays
                    ]}
                    modifiers={{
                        available: { daysOfWeek:[1, 2, 3, 4, 5] },
                    }}
                    onMonthChange={handleMonthChange}
                    selectedDays={selectedDate}
                    onDayClick={handleDateChange}
                    months={[
                        'Janeiro',
                        'Fevereiro',
                        'Março',
                        'Abril',
                        'Maio',
                        'Junho',
                        'Julho',
                        'Agosto',
                        'Setembro',
                        'Outubro',
                        'Novembro',
                        'Dezembro',
                    ]}
                />
            </Calendar>

        </Content>
    </Container>
    )
};

export default Dashboard; 