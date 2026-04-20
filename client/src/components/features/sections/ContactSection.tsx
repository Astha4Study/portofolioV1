export default function ContactSection() {
  return (
    <section className="w-full flex flex-col items-center gap-4">
      {/* Badge */}
      <span className="font-medium px-4 py-1.5 bg-neutral-900 dark:bg-neutral-100 rounded-full text-sm text-white dark:text-neutral-900 transition-colors duration-200">
        Contact
      </span>

      {/* Heading */}
      <div className="text-center max-w-2xl space-y-3">
        <h2 className="text-2xl md:text-3xl font-semibold text-neutral-900 dark:text-neutral-100 tracking-tight transition-colors duration-200">
          Get in touch
        </h2>

        <p className="text-neutral-500 dark:text-neutral-400 text-sm md:text-base leading-relaxed transition-colors duration-200">
          I'm always open to discussing new projects, creative ideas, or
          opportunities to be part of your visions. Feel free to reach out to me
          via{" "}
          <a
            href="mailto:priyanto.dev@gmail.com"
            className="text-neutral-950 dark:text-neutral-100 hover:underline transition-colors duration-200"
          >
            email
          </a>{" "}
          or DM on{" "}
          <a
            href="https://www.instagram.com/rheiyn._/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-neutral-950 dark:text-neutral-100 hover:underline transition-colors duration-200"
          >
            Instagram
          </a>
          .
        </p>
      </div>
    </section>
  );
}
