import HeaderBar from "../navBar";
import "../styles/projects.less";

const ProjectsPage: React.FC = () => {
  return (
    <div>
      <HeaderBar activePage="projects" />
      <div>
        <div className="page-summary">
          <h1 className="title">Projects</h1>
          <p>Research and hobby projects</p>
        </div>
        <div className="scroll-section">
          <div>
            <div>
              <div className="project-link">
                <a href="https://prezi.com/p/w6uqdhhalxd8/cell-counting/">
                  Using Convolutional Neural Networks <br />
                  <span className="sub-description">
                    For Automatic Cell Counting in Microscopy Images
                  </span>
                </a>
              </div>
              <p className="project-description">
                ANN for the automatic counting of cells in microscopy images.
                Used OpenCV (Java interface) for data prep and Caffe for network
                training.
              </p>
            </div>
            <div>
              <div className="project-link">
                <a href="https://www.colorsofconnection.org/ ">
                  Colors of Connection
                </a>
              </div>
              <p className="project-description">
                Volunteer Work with Force For Good. Redesign webpage for
                non-profit. Developed with Wordpress in a team of 6 voulenteers.
              </p>
            </div>
            <div>
              <div className="project-link">
                <a href="http://www.csdept.csi.cuny.edu/~drsturm/Mouster/index.html ">
                  Point Mouster
                </a>
              </div>
              <p className="project-description">
                A game for computer science education research, with a focus on
                engaging women. The game, “Point Mouster,” was developed in
                Unity with a C# codebase. My responsibilities includeded
                collaborating with two other developers on the game design,
                contributing to the code base, and creating all the character
                sprites and assets with Adobe Illustrator.
                <a href="chrome-extension://efaidnbmnnnibpcajpcglclefindmkaj/https://www.sci.brooklyn.cuny.edu/~kletenik/publications/seriousgame.pdf">
                  {" "}
                  Paper of findings{" "}
                </a>
                published in
                <a href="https://www.springerprofessional.de/en/a-serious-game-to-teach-computing-concepts/12498902">
                  {" "}
                  HCI International 2017.
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectsPage;
