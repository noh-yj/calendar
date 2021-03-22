import { firestore } from '../../firebase';
const calendar_db = firestore.collection('calendar');

// action
const GET_CALENDAR = 'calendar/GET_CALENDAR';
const UPLOAD = 'calendar/UPLOAD';

const initialState = {
  list: [
    {
      date: '2020-03-22',
      title: '운동 하기',
      completed: false,
    },
  ],
};
// action creator
export const getCalendar = (data) => {
  return { type: GET_CALENDAR, data };
};

export const createCalendar = (data) => {
  return { type: UPLOAD, data };
};

// firebase
export const getCalendarFB = () => {
  return function (dispatch) {
    calendar_db.get().then((docs) => {
      let calendar_data = [];
      docs.forEach((doc) => {
        if (doc.exists) {
          calendar_data = [...calendar_data, { id: doc.id, ...doc.data() }];
        }
      });
      dispatch(getCalendar(calendar_data));
    });
  };
};
export const addCalendarFB = (data) => {
  return function (dispatch) {
    let calendar_data = {
      date: data.date,
      title: data.title,
      completed: false,
    };
    calendar_db
      .add(calendar_data)
      .then((res) => {
        calendar_data = { ...calendar_data, id: res.id };
        dispatch(createCalendar(calendar_data));
      })
      .catch((e) => {
        console.log(e);
        window.alert('에러가 발생했습니다. 나중에 다시 시도해주세요!');
      });
  };
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case 'calendar/GET_CALENDAR': {
      // 중복 항목 제거

      return { list: action.data };
    }

    case 'calendar/UPLOAD': {
      const new_item = [...state.list, action.data];
      return { list: new_item };
    }
    default:
      return state;
  }
}
