import { useRouter } from 'next/router';

import styled from 'styled-components';
import { RiDeleteBin2Fill } from 'react-icons/ri';

const H4 = styled.h4`
  text-align: center;
`;

const Container = styled.div`
  display: flex;
  padding: 5px 20px;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const ParticipantDiv = styled.div`
  display: flex;
  align-items: center;
`;

const ParticipantDelete = styled.div`
  color: ${({ theme }) => theme.colors.primary};
  cursor: pointer;
  margin-right: 4px;
`;

const Participant = ({ showButton, name, email, onDelete }) => {
  return (
    <ParticipantDiv>
      {
        showButton &&
        <ParticipantDelete onClick={onDelete}>
          <RiDeleteBin2Fill />
        </ParticipantDelete>
      }

      {name} ({email})
    </ParticipantDiv>
  );
}

export default function Participants({ showButton, participants, setParticipants }) {

  const router = useRouter();

  const { id, adminKey } = router.query;

  const deleteApiParticipant = async (participantId) => {
    const { NEXT_PUBLIC_API_URL } = process.env;

    return await fetch(`${NEXT_PUBLIC_API_URL}/secret/${id}/participants/${participantId}`, {
      method: 'DELETE',
      headers: new Headers({
        'admin-key': adminKey
      })
    });
  }

  const deleteParticipant = async (participantId) => {
    const { status } = await deleteApiParticipant(participantId);

    if (status === 204) {
      setParticipants(participants.filter(({externalId}) => externalId !== participantId));
    }
  }

  return (
    <>
      <H4>Participantes: </H4>
      <Container>
        {
          participants.length === 0 && <p>Nenhum participante cadastrado</p>
        }
        {
          participants.map(({ name, email, externalId }) => {
            return (
              <Participant
                key={`participant-${externalId}`}
                name={name}
                email={email}
                showButton={showButton}
                onDelete={() => deleteParticipant(externalId)}
              />
            )
          })
        }
      </Container>
    </>
  );
}
