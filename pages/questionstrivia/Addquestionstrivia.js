import { useState } from "react";
import {
  BsFillEyeFill,
  BsFillEyeSlashFill,
  BsFillPersonFill,
} from "react-icons/bs";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import * as Yup from "yup";
import Cookies from "js-cookie";
import {
  Alert,
  AlertIcon,
  Spinner,
  Card,
  CardBody,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
//components
import Buttons from "../component/controls/Buttons";
import Forms from "../component/controls/Forms";
import FormikErrorMessage from "../component/controls/FormikErrorMessage";
import axios from "../../axios";
import InputFields from "../component/controls/InputFields";
const Addquestionstrivia = ({ setreload, reload }) => {
  //usestate
  const [loading, setLoading] = useState(false);
  const [showPwd, setShowPwd] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  //Formik Validation
  const Namepattern = /^[a-zA-Z][a-zA-Z\\s]+$/;
  const passwordpattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  //Formik InitialValue
  const initialvalue = {
    question: "",
    option1: "",
    option2: "",
    option3: "",
    option4: "",
    answer: "",
  };

  //formik validation
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialvalue,
    validationSchema: Yup.object().shape({
      question: Yup.string().required("Required"),
      option1: Yup.string().required("Required"),
      option2: Yup.string().required("Required"),
      option3: Yup.string().required("Required"),
      option4: Yup.string().required("Required"),
      answer: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      console.log(values);
      setLoading(true);
      const formData = new FormData();
      const token = Cookies.get("token");
      let axiosconfig = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Token ${token}`,
        },
      };
      formData.set("question", values.question);
      formData.set("option1", values.option1);
      formData.set("option2", values.option2);
      formData.set("option3", values.option3);
      formData.set("option4", values.option4);
      formData.set("answer", values.answer);

      axios
        .post("contestserv/contest_trivia_create", formData, axiosconfig)
        .then((res) => {
          if (res.data.status === 200) {
            setLoading(false);
            formik.resetForm();
            console.log(res.data);
            setreload(!reload);
          }
        });
    },
  });

  return (
    <Card>
      <CardBody>
        <Forms className="space-y-2 w-96" onSubmit={formik.handleSubmit}>
          {error && (
            <div className="text-red-500 flex justify-center">{error}</div>
          )}
          <div className="">
            <label className="font-semibold">
              Question
              <span className="text-secondary pb-2">*</span>
            </label>
            <InputFields
              type="text"
              name="question"
              autoComplete="on"
              placeholder="Questions"
              value={formik.values.question}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={
                formik.touched.question && formik.errors.question
                  ? "input-primary ring-2 ring-secondary border-none"
                  : "input-primary"
              }
            />
          </div>
          {formik.touched.question && formik.errors.question ? (
            <FormikErrorMessage>{formik.errors.username}</FormikErrorMessage>
          ) : null}
          <div className="">
            <label className="font-semibold">
              Option 1<span className="text-secondary pb-2">*</span>
            </label>
            <InputFields
              type="text"
              name="option1"
              autoComplete="on"
              placeholder="Option 1"
              value={formik.values.option1}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={
                formik.touched.option1 && formik.errors.option1
                  ? "input-primary ring-2 ring-secondary border-none"
                  : "input-primary"
              }
            />
          </div>
          {formik.touched.option1 && formik.errors.option1 ? (
            <FormikErrorMessage>{formik.errors.option1}</FormikErrorMessage>
          ) : null}
          <div className="">
            <label className="font-semibold">
              Option 2<span className="text-secondary pb-2">*</span>
            </label>
            <InputFields
              type="text"
              name="option2"
              autoComplete="on"
              placeholder="Option 2"
              value={formik.values.option2}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={
                formik.touched.option2 && formik.errors.option2
                  ? "input-primary ring-2 ring-secondary border-none"
                  : "input-primary"
              }
            />
          </div>
          {formik.touched.option2 && formik.errors.option2 ? (
            <FormikErrorMessage>{formik.errors.option2}</FormikErrorMessage>
          ) : null}
          <div className="">
            <label className="font-semibold">
              Option 3<span className="text-secondary pb-2">*</span>
            </label>
            <InputFields
              type="text"
              name="option3"
              autoComplete="on"
              placeholder="Option 3"
              value={formik.values.option3}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={
                formik.touched.option3 && formik.errors.option3
                  ? "input-primary ring-2 ring-secondary border-none"
                  : "input-primary"
              }
            />
          </div>
          {formik.touched.option3 && formik.errors.option3 ? (
            <FormikErrorMessage>{formik.errors.option3}</FormikErrorMessage>
          ) : null}
          <div className="">
            <label className="font-semibold">
              Option 4<span className="text-secondary pb-2">*</span>
            </label>
            <InputFields
              type="text"
              name="option4"
              autoComplete="on"
              placeholder="Option 4"
              value={formik.values.option4}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={
                formik.touched.option4 && formik.errors.option4
                  ? "input-primary ring-2 ring-secondary border-none"
                  : "input-primary"
              }
            />
          </div>
          {formik.touched.option4 && formik.errors.option4 ? (
            <FormikErrorMessage>{formik.errors.option4}</FormikErrorMessage>
          ) : null}
          <div className="">
            <label className="font-semibold">
              Answer
              <span className="text-secondary pb-2">*</span>
            </label>
            <InputFields
              type="text"
              name="answer"
              autoComplete="on"
              placeholder="Answer"
              value={formik.values.answer}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={
                formik.touched.answer && formik.errors.answer
                  ? "input-primary ring-2 ring-secondary border-none"
                  : "input-primary"
              }
            />
          </div>
          {formik.touched.answer && formik.errors.answer ? (
            <FormikErrorMessage>{formik.errors.answer}</FormikErrorMessage>
          ) : null}

          <div>
            <Buttons
              type="submit"
              className="w-full h-12 rounded-xl bg-greencolor text-whitecolor mt-4"
            >
              {loading ? (
                <Spinner size="xs" colorScheme="whiteAlpha" />
              ) : (
                "Submit"
              )}
            </Buttons>
          </div>
        </Forms>
      </CardBody>
    </Card>
  );
};

export default Addquestionstrivia;
