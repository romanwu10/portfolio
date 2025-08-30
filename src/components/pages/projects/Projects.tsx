import React from 'react';
import classes from './Projects.module.css';
import ProjectCaseStudy from './ProjectCaseStudy'; // Import the new component

// Ensure consistent typing for project entries
interface ProjectData {
  id: string;
  title: string;
  subtitle?: React.ReactNode;
  introDescription?: React.ReactNode;
  heroImage?: { src: string; alt: string; caption?: string };
  content: React.ReactNode;
}

const projectsData: ProjectData[] = [
  {
    id: 'gemini-enhancer',
    title: 'Gemini Enhancer (Chrome Extension)',
    subtitle: (
      <a href="https://github.com/romanywu/Gemini-Enhancer" target="_blank" rel="noopener noreferrer">
        GitHub: romanywu/Gemini-Enhancer
      </a>
    ),
    introDescription: (
      <>
        A Chrome extension that enhances your experience with Gemini (gemini.google.com) by adding a follow-up button and custom slash commands. Select text to quickly insert citations, or type <code>/</code> in chat to use or create custom prompt shortcuts. All data is stored locally and never leaves your device.
      </>
    ),
    content: (
      <>
        <section className={classes.section}>
          <h3 className={classes.sectionTitle}>Features</h3>
          <ul>
            <li><b>Follow-up Button:</b> Select any text and click the "Follow-up" button to insert it as a citation in Gemini's chat input.</li>
            <li><b>Slash Commands:</b> Type <code>/</code> to access default and custom prompt shortcuts (e.g., /translate, /explain, /summarize, etc.).</li>
            <li><b>Custom Commands:</b> Add your own slash commands with prompt templates using the extension popup.</li>
            <li><b>Modern UI:</b> Automatic dark/light theme, smooth animations, and responsive design.</li>
            <li><b>Privacy:</b> No personal data is collected; all settings and commands are stored locally.</li>
          </ul>
        </section>
        <section className={classes.section}>
          <h3 className={classes.sectionTitle}>Installation</h3>
          <ol>
            <li>Visit <a href="https://github.com/romanywu/Gemini-Enhancer" target="_blank" rel="noopener noreferrer">the GitHub repository</a>.</li>
            <li>Download or clone the repo.</li>
            <li>Open <code>chrome://extensions/</code> in Chrome and enable Developer Mode.</li>
            <li>Click "Load unpacked" and select the <code>Chrome</code> folder from the repo.</li>
            <li>The extension will be active on <b>gemini.google.com</b>.</li>
          </ol>
        </section>
      </>
    ),
  },
  {
    id: 'mckeil-marine',
    title: 'WhiteCap (Accounting ERP @ McKeil Marine)',
    content: (
      <>
        {/* The Execution Section */}
        <section className={classes.section}>
          <h3 className={classes.sectionTitle}>The Execution</h3>
          
          <div className={classes.executionContent}>
            <div className={classes.executionItem}>
              <p className={classes.justify}>
                I selected Google's Material UI because of its modern look, large number of 
                available web components and active developer support. No library is going to cover 
                absolutely everything, but Material was a good place to start. From here I built 
                out additional components and made extensive customizations to ensure the app 
                had a cohesive look and every action felt native to the UI.
              </p>
              <img 
                src="/projects/new-trip-long.jpg" 
                alt="McKeil Marine - New Trip Interface" 
                className={classes.executionImage}
              />
            </div>

            <div className={classes.executionItem}>
              <h4 className={classes.executionTitle}>Application Data Flow</h4>
              <p className={classes.justify}>
                SQL stored procedures manage most of the data processing, but I still needed an 
                efficient way to communicate with them. To do this, I set up a number of 
                asynchronous javascript functions that listen for changes in the UI. As soon as a 
                change occurs, the appropriate arguments are sent to a PHP handler which calls the 
                database and returns formatted JSON back to the frontend, where it's parsed, 
                sorted, looped and displayed on the UI.
              </p>
              <img 
                src="/projects/app-data-flow.svg" 
                alt="McKeil Marine - App Data Flow" 
                className={classes.executionImage}
              />
            </div>

            <div className={classes.executionItem}>
              <h4 className={classes.executionTitle}>Modular Development</h4>
              <p className={classes.justify}>
                With well over 10,000 lines of code, intuitive project structure is more than a 
                nice-to-have; it's a requirement. I took full advantage of ES6 imports and 
                exports, building a structure of component functions and templates. BEM naming 
                convention was used for HTML and SCSS, and in select cases JSON files were used to 
                dynamically generate entire pages for easy updating in the future.
              </p>
              <div className={classes.codeImages}>
                <img 
                  src="/projects/mckeil-code.jpg" 
                  alt="McKeil Marine - Code Promise" 
                  className={classes.codeImage}
                />
                <img 
                  src="/projects/mckeil-code-split.jpg" 
                  alt="McKeil Marine - Code Structure" 
                  className={classes.codeImage}
                />
              </div>
            </div>
          </div>
        </section>

        {/* The Finished Product Section */}
        <section className={classes.section}>          
          <div className={classes.finishedProduct}>
            <h4 className={classes.executionTitle}>Intuitive, Efficient and Downright Pretty</h4>
            <p className={classes.justify}>
              The finished product is easy to use, lightning-fast and beautiful to look at 
              on any device. With their new application, McKeil Marine's vessel and shore 
              staff are now able to seamlessly manage the entire trip process from one location.
            </p>
            
            <img 
              src="/projects/mckeil-site-mock.jpg" 
              alt="McKeil Marine - Website Mockup" 
              className={classes.finishedImage}
            />

          </div>
        </section>
      </>
    ),
  }
];

const Projects: React.FC = () => {
  return (
    <div className={classes.projectsContainer}>
      {projectsData.map(project => (
        <ProjectCaseStudy
          key={project.id}
          title={project.title}
          subtitle={project.subtitle}
          introDescription={project.introDescription}
          heroImage={project.heroImage}
        >
          {project.content}
        </ProjectCaseStudy>
      ))}
    </div>
  );
};

export default Projects;
