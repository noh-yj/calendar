import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import AlarmIcon from '@material-ui/icons/Alarm';
import RedditIcon from '@material-ui/icons/Reddit';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { getCalendarFB } from './redux/modules/calendar';

function Detail(props) {
  const data = useSelector((state) => state.calendar.list);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCalendarFB());
  }, [dispatch]);
  let primaryData;

  for (let i = 0; i < data.length; i++) {
    if (data[i].id === props.match.params.defid) {
      primaryData = data[i];
    }
  }

  return (
    <Container className='container'>
      <Modal>
        <h1>
          <AlarmIcon /> &nbsp;상세 일정 보기
        </h1>
        <h2>
          <CalendarTodayIcon style={{ color: '#85C1E9' }} />
          &nbsp; 날짜: {primaryData.date}
        </h2>
        <h2>
          <RedditIcon style={{ color: '#85C1E9' }} />
          &nbsp; 할일: {primaryData.title}
        </h2>
        <hr />

        <BtnGroup>
          <Button
            variant='contained'
            style={{ marginRight: '50px' }}
            onClick={() => {
              props.history.goBack();
            }}
          >
            일정 삭제
          </Button>
          <Button
            variant='contained'
            color='primary'
            style={{ marginTop: '5px' }}
            onClick={() => {
              props.history.goBack();
            }}
          >
            일정 완료
          </Button>
        </BtnGroup>
      </Modal>
    </Container>
  );
}

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Modal = styled.div`
  display: flex;
  flex-direction: column;
  background: #fff;
  padding: 24px 50px;
  border-radius: 4px;
  width: 600px;
  height: 400px;
  box-sizing: border-box;
  & h1 {
    text-align: center;
    color: #af7ac5;
  }
  & h2 {
    color: #34495e;
  }

  & Button {
    min-width: 200px;
  }
`;
const BtnGroup = styled.div`
  margin: 0 auto;
  @media only screen and (max-width: 768px) {
    & Button {
      width: 100%;
    }
  }
`;

export default Detail;
