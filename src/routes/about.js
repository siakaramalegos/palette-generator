import { h } from "preact";

const About = () => (
  <main class="about">
    <section>
      <h1>About</h1>
      <p>
        Built by <a href="https://sia.codes">Sia Karamalegos</a>.
      </p>
      <p>
        Like this tool?{" "}
        <a href="https://www.buymeacoffee.com/sia.codes">Buy me a coffee</a>.
      </p>
    </section>
    <section>
      <h2>Resources</h2>
      <ul>
        <li>
          <a href="https://twitter.com/DanHollick/status/1417895151003865090">
            Have you ever wondered why the WCAG colour contrast ratio doesn't
            always seem to work?
          </a>{" "}
          Twitter thread by Dan Hollick
        </li>
        <li>
          <li>
            <a href="https://www.franciscobrusa.dev/blog/generated-color-palettes">
              Generating color palettes with code
            </a>{" "}
            by Francisco Brusa
          </li>
          <a href="https://github.com/w3c/wcag/issues/1213">
            Create new technique for new contrast formula (threshold value)
          </a>{" "}
          issue in the WCAG GitHub repo
        </li>
        <li>
          <a href="https://medium.muz.li/natural-color-palettes-7769e5b38ecd">
            Pick Better Colors with the Hue Shift Method
          </a>{" "}
          by Sam Gordon
        </li>
      </ul>
    </section>
  </main>
);

export default About;
