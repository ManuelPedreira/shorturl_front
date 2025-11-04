import ErrorPage from "@/ui/components/ErrorPage/ErrorPage";

export default function NotFound() {
  return (
    <ErrorPage>
      <p>404 - Page Not Found</p>
      <small>
        The page you’re trying to access doesn’t exist or is unavailable. Please check the URL and
        try again.
      </small>
    </ErrorPage>
  );
}
