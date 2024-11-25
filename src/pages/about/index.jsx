import { useEffect } from "react";
import Emily from "../../assets/images/amy-hirschi-b3AYk8HKCl0-unsplash.webp";
import Adeel from "../../assets/images/itay-verchik-YmQ8TrsieE4-unsplash.webp";
import Sara from "../../assets/images/michael-dam-mEZ3PoFGs_k-unsplash.webp";
import Daniel from "../../assets/images/salome-guruli-6GgCyNnF6Zs-unsplash.webp";
import Mia from "../../assets/images/christina-wocintechchat-com-lFntEHwQvi4-unsplash.webp";

function About() {
  useEffect(() => {
    document.title = "Holidaze - About";
  }, []);

  return (
    <main>
      <section className="about-img background-image-position background-image-size-450 background-image-position-x-right"></section>
      <section className="d-flex mt-5 aboutText">
        <div className="flex-3">
          <div className="circle"></div>
          <h1 className=" my-3 d-inline">Welcome to Holidaze, </h1>
          <p className=" mx-5">
            your go-to platform for discovering and booking unique, carefully
            curated accommodation experiences across the globe. Launched in
            2024, Holidaze was created with the vision of making holiday
            planning stress-free, seamless, and personalized.
          </p>
          <p className="mx-5">
            Though newly launched, Holidaze is built on a foundation of over 30
            years of combined experience in the travel and accommodation
            industry. Our co-founders, Emily Rhodes and Adeel Khan, have worked
            with some of the biggest names in travel and saw firsthand how
            fragmented and complicated booking platforms could be. They decided
            to take their deep expertise and passion for travel to create
            something better—a platform that balances user-friendly technology
            with personalized, thoughtful customer service.
          </p>
          <p className="mx-5">
            At Holidaze, our mission is simple: to connect travelers with
            handpicked venues, from charming countryside escapes to modern city
            lofts, with an intuitive and engaging interface. We believe that
            every trip starts with finding the perfect place to stay, and
            we&apos;re here to make that journey easy and enjoyable.
          </p>
          <p className="fw-bold mx-5">Join the Journey</p>
          <p className="mx-5">
            As we continue to grow, we invite you to follow our journey, explore
            our curated stays, and share your own travel stories. Let&apos;s
            make your next holiday your best one yet with Holidaze.
          </p>
        </div>
      </section>
      <div className=" border-primary border-top my-5 w-75 mx-auto"></div>
      <section>
        <h3 className="text-center mb-5 ">Meet the Holidaze team</h3>
        <div className="d-lg-flex align-items-center col-md-9 col-lg-10 mx-auto my-5">
          <div className="text-center col-10 col-md-8 col-lg-5 col-xl-4 m-auto">
            <img
              src={Emily}
              alt="Woman with black hair and jacket smiling at camera"
              className="rounded-circle col-10 m-auto"
            />
          </div>
          <div className=" px-4">
            <p className="fw-bold">Emily Rhodes - Co-founder and CEO</p>
            <p>
              With over 15 years in the travel and hospitality sector, Emily has
              worked with major booking platforms, gaining invaluable insight
              into the industry. Before launching Holidaze, she led operations
              for a large online travel agency, managing everything from partner
              relationships to global travel logistics. Emily&apos;s experience
              and vision drive Holidaze&apos;s mission to offer a seamless,
              traveler-first booking experience. An avid traveler herself, Emily
              has explored over 40 countries and brings her global perspective
              to every aspect of the business.
            </p>
          </div>
        </div>

        <div className="d-lg-flex align-items-center col-md-9 col-lg-10 mx-auto my-5">
          <div className="text-center col-10 col-md-8 col-lg-5 col-xl-4 m-auto d-lg-none">
            <img
              src={Adeel}
              alt="Man in a white shirt and black suit jacket smiling at the camera"
              className="rounded-circle col-10 m-auto"
            />
          </div>
          <div className=" px-4">
            <p className="fw-bold">Adeel Khan - Co-founder and CTO</p>
            <p>
              A tech-savvy entrepreneur with a background in both travel and
              technology, Adeel has spent the last 18 years building scalable,
              user-friendly platforms for companies in the travel industry. With
              his expertise in software engineering and product design, Adeel is
              the mastermind behind the innovative technology that powers
              Holidaze. He is passionate about harnessing the latest in web
              development to ensure Holidaze offers a smooth, responsive, and
              secure experience for both customers and venue owners.
            </p>
          </div>
          <div className="text-center col-10 col-md-8 col-lg-5 col-xl-4 m-auto d-none d-lg-block">
            <img
              src={Adeel}
              alt="Man in a white shirt and black suit jacket smiling at the camera"
              className="rounded-circle col-10 m-auto"
            />
          </div>
        </div>

        <div className="d-lg-flex align-items-center col-md-9 col-lg-10 mx-auto my-5">
          <div className="text-center col-10 col-md-8 col-lg-5 col-xl-4 m-auto">
            <img
              src={Sara}
              alt="Woman with dark brown hair, a red turtleneck sweater and red lipstck smiles at the camera"
              className="rounded-circle col-10 m-auto"
            />
          </div>
          <div className=" px-4">
            <p className="fw-bold">
              Sara O&apos;Connell - Head of Customer Success
            </p>
            <p>
              Sara brings over 10 years of experience in customer relations from
              her previous role at a luxury hotel chain, where she specialized
              in creating bespoke travel experiences for high-end clients. At
              Holidaze, she leads the Customer Success team, ensuring that users
              feel supported from the moment they land on the site to the time
              they check out of their accommodation. Sara is known for her
              personalized, empathetic approach and her ability to turn any
              issue into a positive experience.
            </p>
          </div>
        </div>

        <div className="d-lg-flex align-items-center col-md-9 col-lg-10 mx-auto my-5">
          <div className="text-center col-10 col-md-8 col-lg-5 col-xl-4 m-auto d-lg-none">
            <img
              src={Daniel}
              alt="Man with half long curly hair and a bear looking at the camera with a slight smile"
              className="rounded-circle col-10 m-auto"
            />
          </div>
          <div className=" px-4">
            <p className="fw-bold">Daniel Martinez - Lead Developer</p>
            <p>
              Daniel has been working as a full-stack developer for more than 8
              years, with a specialty in developing dynamic, high-performance
              web applications. Having collaborated on several high-profile
              travel apps, Daniel joined Holidaze to bring his technical
              expertise to the table. He ensures that Holidaze runs flawlessly
              for both customers and venue owners, constantly optimizing
              performance and adding new features to enhance the user
              experience.
            </p>
          </div>
          <div className="text-center col-10 col-md-8 col-lg-5 col-xl-4 m-auto d-none d-lg-block">
            <img
              src={Daniel}
              alt="Man with half long curly hair and a bear looking at the camera with a slight smile"
              className="rounded-circle col-10 m-auto"
            />
          </div>
        </div>

        <div className="d-lg-flex align-items-center col-md-9 col-lg-10 mx-auto my-5">
          <div className="text-center col-10 col-md-8 col-lg-5 col-xl-4 m-auto">
            <img
              src={Mia}
              alt="Woman with black braided hair and crossed arms smiling at the camera"
              className="rounded-circle col-10 m-auto"
            />
          </div>
          <div className=" px-4">
            <p className="fw-bold">
              Mia Johnson - Marketing & Social Media Manager
            </p>
            <p>
              Mia is the creative force behind Holidaze&apos;s branding and
              social media presence. With a degree in digital marketing and 5
              years of experience working with startups, Mia is passionate about
              connecting with travelers through compelling stories, engaging
              content, and innovative campaigns. She is always keeping her
              finger on the pulse of the latest travel trends and ensures
              Holidaze remains relevant and exciting in the ever-evolving world
              of digital marketing.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

export { About };
