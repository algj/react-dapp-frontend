import Markdown from "../components/Markdown";
import Config from "../Config"; // { faq: {question: string, answer: string}[] }

const FAQ = () => {
  const faqs = Config.faq.map((faq) => {
    return (
      <div key={faq.question} className="col col-12 col-md-6 g-4 p-4">
        <h3>{faq.question}</h3>
        <Markdown className="markdown" children={faq.answer} />
      </div>
    );
  });

  return (
    <div className="container my-4 headers-white">
      <div className="row">
        {faqs}
      </div>
    </div>
  );
};

export default FAQ;
