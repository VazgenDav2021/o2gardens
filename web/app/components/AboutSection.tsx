"use client";

const AboutSection = () => {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-muted/20 to-background">
      <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center">
        <img
          src="/about-us.jpg"
          alt="О нас"
          className="rounded-xl shadow-lg hover:scale-105 transition-transform duration-500"
        />
        <div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">О нас</h2>
          <p className="text-muted-foreground mb-4">
            O₂ Cafe & Restaurant — это место, где стиль, вкус и атмосфера
            объединяются, чтобы подарить вам идеальные моменты. Мы гордимся
            нашим сервисом, кухней и индивидуальным подходом к каждому гостю.
          </p>
          <p className="text-muted-foreground">
            Наши залы подходят для любых мероприятий — от интимных встреч до
            масштабных торжеств. Доверьте свой праздник нам — и мы превратим его
            в незабываемое событие.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
