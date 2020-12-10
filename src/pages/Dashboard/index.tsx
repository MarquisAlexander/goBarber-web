import React, { useState } from 'react';

import { useAuth } from '../../hooks/auth';

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

const Dashboard: React.FC = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());

    const {signOut, user} = useAuth();

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
                    <span>Hoje</span>
                    <span>Dia 06</span>
                    <span>Segunda-feira</span>
                </p>

                <NextAppointment>
                    <strong>Atendimento a seguir</strong>
                    <div>
                        <img src="google.com/marquisalexander" alt="Marquis Alexander"/>

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
                        <img src="google.com/marquisalexander" alt="Marquis Alexander"/>
                        
                        <strong>Marquis Alexander</strong>
                            </div>
                        </span>
                    </Appointment>

                    <Appointment>
                        <span>
                            <FiClock />
                            08:00
                            <div>
                        <img src="google.com/marquisalexander" alt="Marquis Alexander"/>
                        
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
                        <img src="google.com/marquisalexander" alt="Marquis Alexander"/>
                        
                        <strong>Marquis Alexander</strong>
                            </div>
                        </span>
                    </Appointment>
                </Section>
            </Schedule>

            <Calendar>

            </Calendar>

        </Content>
    </Container>
    )
};

export default Dashboard; 