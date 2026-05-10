import Footer from "./footer";
import GeneralInformation from "./general-information";
import Note from "./note";

export default function BodyInspectionCreate() {
  return (
    <section className="flex flex-col mx-20 my-2  shadow rounded-md bg-white">
      <div className="py-4">
        <GeneralInformation />
        <Note />
      </div>
      <Footer />
    </section>
  );
}
