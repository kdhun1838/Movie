import React, { useCallback, useEffect, useState } from "react";
import AdminMovieTime from "../../../components/admin/ticket/AdminMovieTime";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteSchedule,
  resetSchedule,
  setPostSchedule,
  setSchedule,
} from "../../../modules/admin/adminschedule";
import { readRegion, readTime, readMovie } from "../../../modules/stepfirst";

const AdminMovieTimeContainer = () => {
  const [onAddModal, setOnAddModal] = useState(false);
  const [date, setDate] = useState(null);

  const { schedule } = useSelector(({ adminschedule }) => adminschedule);

  const dispatch = useDispatch();

  const formatDate = (date) => {
    if (!date) return "";

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const onModal = () => {
    setOnAddModal(true);
  };

  useEffect(() => {
    dispatch(readRegion());
    dispatch(readTime());
    dispatch(readMovie());
  }, [dispatch]);

  const onCloseModal = () => {
    setOnAddModal(false);
    setTimeout(() => {
      dispatch(resetSchedule());
      window.location.reload();
    }, 100);
  };

  const onSetSchedule = useCallback(
    (e, formatedDate) => {
      dispatch(setSchedule(e, formatedDate));
    },
    [dispatch]
  );

  const checkNull = () => {
    if (
      schedule.cinema !== "" &&
      schedule.seat !== "" &&
      schedule.room !== "" &&
      schedule.movie !== "" &&
      schedule.age !== "" &&
      schedule.disp !== "" &&
      schedule.language !== "" &&
      schedule.start !== "" &&
      schedule.end !== "" &&
      schedule.date !== ""
    ) {
      return true;
    } else {
      return;
    }
  };

  const onSubmit = useCallback(() => {
    if (checkNull()) {
      dispatch(setPostSchedule(schedule));
      setTimeout(() => {
        dispatch(readTime());
        dispatch(resetSchedule());
        window.location.reload();
      }, 100);
      setOnAddModal(false);
    } else {
      alert("모두 선택해주세요.");
    }
  }, [dispatch, schedule]);

  const onDelete = useCallback(
    (num) => {
      dispatch(deleteSchedule(num));
      setTimeout(() => {
        dispatch(readTime());
      }, 100);
    },
    [dispatch]
  );

  return (
    <div>
      <AdminMovieTime
        date={date}
        setDate={setDate}
        onSetSchedule={onSetSchedule}
        onModal={onModal}
        onCloseModal={onCloseModal}
        onAddModal={onAddModal}
        formatDate={formatDate}
        onSubmit={onSubmit}
        onDelete={onDelete}
      />
    </div>
  );
};

export default AdminMovieTimeContainer;
