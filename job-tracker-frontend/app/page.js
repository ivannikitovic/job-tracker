import AddJob from "./add-job";
import JobsList from "./jobs-list";

export default function Page() {
  return (
    <div className="m-5">
      <AddJob />
      <JobsList />
    </div>
  );
}