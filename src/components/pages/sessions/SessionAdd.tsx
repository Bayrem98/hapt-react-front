import { useEffect } from "react";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { FormattedMessage } from "react-intl";
import {
  Button,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";
import { addSession } from "../../../actions/sessions/action";
import { getSubjects } from "../../../actions/subjects/action";
import { getUsers } from "../../../actions/users/action";
import User from "../../../@types/User";
import Subject from "../../../@types/Subject";

interface SessionAddPropsType {
  refresh: () => void;
}
const SessionAdd = (props: SessionAddPropsType) => {
  const [isOpened, setIsOpened] = useState<boolean>(false);

  const [teacherList, setTeacherList] = useState<User[] | undefined>([]);
  const [studentList, setStudentList] = useState<User[] | undefined>([]);
  const [subjectList, setSubjectList] = useState<Subject[] | undefined>([]);

  const [label, setLabel] = useState<string>("");
  const [start_date, setStartDate] = useState<string>("");
  const [end_date, setEndDate] = useState<string>("");
  const [teacher, setTeacher] = useState<string | undefined>();
  const [students, setStudents] = useState<string[] | undefined>([]);
  const [subject, setSubject] = useState<string | undefined>();

  const submit = () => {
    const newSession = {
      label,
      start_date,
      end_date,
      teacher,
      students,
      subject,
    };

    addSession(newSession, () => {
      props.refresh();
      setIsOpened(false);
      reset();
    });
  };

  const reset = () => {
    setLabel("");
    setStartDate("");
    setEndDate("");
    setTeacher(undefined);
    setStudents(undefined);
    setSubject(undefined);
  };

  useEffect(() => {
    getSubjects(setSubjectList);
    getUsers((users) =>
      setTeacherList(users.filter((u) => u.roles.includes("teacher")))
    );
    getUsers((users) =>
      setStudentList(users.filter((u) => u.roles.includes("student")))
    );
  }, []);

  return (
    <>
      <Button
        color="success"
        size="lg"
        className="mb-2"
        onClick={() => setIsOpened(true)}
      >
        <FormattedMessage id="page.session.add" />{" "}
        <FontAwesomeIcon icon={faAdd} />
      </Button>
      <Modal
        centered
        scrollable
        isOpen={isOpened}
        toggle={() => setIsOpened(!isOpened)}
      >
        <ModalHeader
          className="bg-success text-white"
          toggle={() => setIsOpened(!isOpened)}
        >
          <FormattedMessage id="Session.add.dialog.title" />
        </ModalHeader>
        <ModalBody>
          <Form inline>
            <FormGroup floating>
              <Input
                value={label}
                id="label"
                name="label"
                type="text"
                onChange={(e) => setLabel(e.target.value)}
              />
              <Label for="label">
                <FormattedMessage id="session.label" />
              </Label>
            </FormGroup>
            <FormGroup floating>
              <Input
                value={start_date}
                id="start_date"
                name="start_date"
                type="date"
                onChange={(e) => setStartDate(e.target.value)}
              ></Input>
              <Label for="field">
                <FormattedMessage id="session.start_date" />
              </Label>
            </FormGroup>
            <FormGroup floating>
              <Input
                value={end_date}
                id="end_date"
                name="end_date"
                type="date"
                onChange={(e) => setEndDate(e.target.value)}
              />
              <Label for="end_date">
                <FormattedMessage id="session.end_date" />
              </Label>
            </FormGroup>
            <FormGroup floating>
              <Input
                value={teacher}
                id="teacher"
                name="teacher"
                type="select"
                onChange={(e) => setTeacher}
              >
                {teacherList?.map((t) => (
                  <option key={t._id} value={t._id}>
                    {t.firstName + ` ` + t.lastName}
                  </option>
                ))}
              </Input>
              <Label for="teacher">
                <FormattedMessage id="session.teacher" />
              </Label>
            </FormGroup>
            <FormGroup floating>
              <Input
                value={students}
                id="students"
                name="students"
                type="select"
                onChange={(e) => setStudents}
              >
                {studentList?.map((s) => (
                  <option key={s._id} value={s._id}>
                    {s.firstName + ` ` + s.lastName}
                  </option>
                ))}
              </Input>
              <Label for="students">
                <FormattedMessage id="session.students" />
              </Label>
            </FormGroup>
            <FormGroup floating>
              <Input
                value={subject}
                id="subject"
                name="subject"
                type="select"
                onChange={(e) => setSubject}
              >
                {subjectList?.map((s) => (
                  <option key={s._id} value={s._id}>
                    {s.label}
                  </option>
                ))}
              </Input>
              <Label for="subject">
                <FormattedMessage id="session.subject" />
              </Label>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="success" onClick={submit}>
            <FormattedMessage id="button.confirm" />
          </Button>{" "}
          <Button onClick={() => setIsOpened(false)}>
            <FormattedMessage id="button.cancel" />
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default SessionAdd;
