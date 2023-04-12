import Markdown from "../components/Markdown";
import Config from "../Config"; // { faq: {question: string, answer: string}[] }

const FAQ = () => {
  return (
    <div className="container my-4 headers-white col-12 col-md-7 col-lg-6 col-xl-5">
      <h1 className="text-center">Terms and Conditions</h1>
      <Markdown children={Config.terms}/>
    </div>
  );
};

export default FAQ;
