export default function ContactSection() {
  return (
    <section className="w-full flex flex-col items-center gap-4">
      {/* Badge */}
      <span className="font-medium px-4 py-1.5 bg-neutral-900 rounded-full text-sm text-white">
        Contact
      </span>

      {/* Heading */}
      <div className="text-center max-w-2xl space-y-3">
        <h2 className="text-2xl md:text-3xl font-semibold text-neutral-900 tracking-tight">
          Get in touch
        </h2>

        <p className="text-neutral-500 text-sm md:text-base leading-relaxed">
          I'm always open to discussing new projects, creative ideas, or
          opportunities to be part of your visions. Feel free to reach out to me
          via{" "}
          <a
            href="mailto:priyanto.dev@gmail.com"
            className="text-neutral-950 hover:underline"
          >
            email
          </a>{" "}
          or DM on{" "}
          <a
            href="https://www.instagram.com/rheiyn._/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-neutral-950 hover:underline"
          >
            Instagram
          </a>
          .
        </p>
      </div>
    </section>
  );
}
