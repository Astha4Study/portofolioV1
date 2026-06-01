import Sertifications from "../../Sertifications";

export default function SertificateSection() {
  return (
    <section className="w-full flex flex-col items-center gap-4 px-5 sm:px-6 md:px-0">
      {/* Badge */}
      <span className="font-medium px-4 py-1.5 bg-neutral-900 dark:bg-neutral-100 rounded-full text-sm text-white dark:text-neutral-900 transition-colors duration-200">
        Sertificates
      </span>

      {/* Heading */}
      <div className="w-full max-w-2xl text-center space-y-3">
        <h2 className="text-2xl md:text-3xl font-semibold text-neutral-900 dark:text-neutral-100 tracking-tight transition-colors duration-200">
          Check out my achievements
        </h2>

        <p className="text-neutral-500 dark:text-neutral-400 text-sm md:text-base leading-relaxed transition-colors duration-200">
          A collection of certificates I've earned, showcasing my expertise in
          frontend development, UI/UX design, and scalable web applications.
          Each certificate reflects my focus on performance, usability, and
          clean, maintainable code.
        </p>
      </div>

      <div className="w-full">
        <Sertifications />
      </div>
    </section>
  );
}
