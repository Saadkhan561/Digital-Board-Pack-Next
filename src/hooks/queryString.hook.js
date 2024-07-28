import { useRouter } from "next/router";

export const useQueryString = () => {
  const router = useRouter();
  const queryStringChanger = (name) => {
    if (router.query[name]) {
      delete router.query[name];
    } else {
      router.query[name] = true;
    }
    router.push(router, undefined, { shallow: true });
  };

  return { queryStringChanger };
};
