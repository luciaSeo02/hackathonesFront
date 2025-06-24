import { useEffect, useState } from "react";

const TermsContent = ({ lang = "es" }) => {
  const [terms, setTerms] = useState(null);

  useEffect(() => {
    fetch(`/terms.${lang}.json`)
        .then(res => res.json())
        .then(setTerms);
  }, [lang]);

  if (!terms) return <p>Cargando...</p>;

  return (
    <section className="bg-white -mt-20 pt-10 rounded-3xl gap-3 mb-6
    lg:-mt-20 lg:pt-20 lg:rounded-3xl lg:gap-4 lg:mb-20">
        <div className="max-w-6xl mx-auto">
            <h3 className="text-2xl font-bold mb-2">{terms.title}</h3>
            <p className="text-sm mb-4">{terms.lastUpdate}</p>
            {terms.sections.map((section, idx) => (
                <article key={idx} className="mb-4">
                    {section.heading && (
                        <h4 className="font-semibold">{section.heading}</h4>
                    )}
                    <p>{section.content}</p>
                </article>
            ))}
        </div>
    </section>
  );
};

export default TermsContent;