import { useState } from "react";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import * as Yup from "yup";
import Cookies from "js-cookie";
import { CgProfile } from "react-icons/cg";
import { BiLockAlt } from "react-icons/bi";
import { BsArrowRightCircle } from "react-icons/bs";
import { Alert, AlertIcon, AlertDescription, Spinner } from "@chakra-ui/react";

//components
import Forms from "../component/controls/Forms";
import FormikErrorMessage from "../component/controls/FormikErrorMessage";
import axios from "../../axios";
const Loginvalidation = () => {
  //usestate
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  //Formik InitialValue
  const initialvalue = {
    username: "",
    password: "",
  };

  //formik validation
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialvalue,
    validationSchema: Yup.object().shape({
      username: Yup.string().required("Enter Username"),
      password: Yup.string().required("Enter password"),
    }),
    onSubmit: (values) => {
      console.log(values);
      setLoading(true);
      const data = {
        username: values.username,
        password: values.password,
        entity_id: 1,
      };
      axios.post("usrserv/auth_token", data).then((res) => {
        if (res.data.code === 500) {
          setError(res.data.description);
          setLoading(false);
        } else {
          if (res.data.agent === 1) {
            console.log(res.data);
            router.push("/dashboard");
            Cookies.set("adminid", res.data.employee_id);
            Cookies.set("token", res.data.token);
          }
        }
      });
    },
  });

  return (
    <div class="mt-10">
      {error && (
        <Alert status="error" className="mb-2">
          <AlertIcon />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <Forms onSubmit={formik.handleSubmit}>
        <div class="flex flex-col mb-6">
          <label
            for="email"
            class="mb-1 text-xs sm:text-sm tracking-wide text-gray-600"
          >
            User Name
          </label>
          <div class="relative">
            <div class="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
              <CgProfile />
            </div>
            <input
              type="text"
              name="username"
              autoComplete="on"
              placeholder="User Name"
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={
                formik.touched.username && formik.errors.username
                  ? "input-primary ring-2 ring-secondary border-none"
                  : "input-primary"
              }
            />
          </div>
          {formik.touched.username && formik.errors.username ? (
            <FormikErrorMessage>{formik.errors.username}</FormikErrorMessage>
          ) : null}
        </div>
        <div class="flex flex-col mb-6">
          <label
            for="password"
            class="mb-1 text-xs sm:text-sm tracking-wide text-gray-600"
          >
            Password:
          </label>
          <div class="relative">
            <div class="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
              <BiLockAlt />
            </div>
            <input
              name="password"
              id="password"
              autoComplete="current-password"
              placeholder="Password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={
                formik.touched.password && formik.errors.password
                  ? "input-primary ring-2 ring-secondary border-none "
                  : "input-primary"
              }
            />
          </div>
          {formik.touched.password && formik.errors.password ? (
            <FormikErrorMessage>{formik.errors.password}</FormikErrorMessage>
          ) : null}
        </div>

        <div class="flex w-full">
          <button
            type="submit"
            class="flex items-center justify-center focus:outline-none text-white text-sm sm:text-base bg-blue-600 hover:bg-blue-700 rounded py-2 w-full transition duration-150 ease-in"
          >
            {loading ? (
              <Spinner />
            ) : (
              <>
                <span class="mr-2 uppercase">Login</span>
                <BsArrowRightCircle />
              </>
            )}
          </button>
        </div>
      </Forms>
    </div>
  );
};

export default Loginvalidation;
