import React, { useCallback, useEffect, useState, useRef } from "react";
import Div from "Common/components/div";
import styles from "./project_details_page.module.scss";
import { useSpring, animated } from "react-spring";
import { projectsListValue } from "Constants/projectsConstants";
import isEmpty from "lodash/isEmpty";
import ProjectViewPager from "./projectViewPager";
import ProjectDescription from "./projectDescription";
import ElementTransition from "./elementTransition";
import ElementScroll from "./elementScroll";
import ProjectImageGrid from "./projectImageGrid";
import backIcon from "Icons/icon-left-arrow-dark.png";
import closeIcon from "Icons/icon-cross.png";
import { animationFrameTimeout } from "Common/utils";
import useBreakpoint from "Common/hooks/useBreakpoint";
import useProjectHeaderTranslate from "Common/hooks/useProjectHeaderTranslate";

const ProjectDetailsPage = ({
  match,
  style,
  history,
  location,
  startPageEndAnimation,
  onPageAnimationEnd,
}) => {
  const projectId = match && match.params ? match.params.projectSlug : "";
  const [project] = useState(projectsListValue[projectId] || {});
  const [headerShadow, setHeaderShadow] = useState(false);
  const [showViewPagerModal, toggleViewPager] = useState(false);
  const [descriptionPageImageRect, setDescriptionPageImageRect] = useState({});
  const [gridIndex, setGridIndex] = useState(0);
  const screenSize = useBreakpoint();

  const { imageRect, containerRect } =
    location && location.state ? location.state : {};
  // Stores the listing page location onto a state
  const [listingPageImageRect] = useState(imageRect);
  const [listingPageContainerRect] = useState(containerRect);

  const imageRef = useRef(null);
  const isPageRedirectedFromListing =
    !!listingPageImageRect && !!listingPageContainerRect;

  //-------------------------------------------ScrollAnimation
  const [{ st }, set] = useSpring(() => ({ st: 0 }));
  let onScroll = useCallback(
    (e) => {
      // Shows/Hides header based on scroll position
      if (e.target.scrollTop > 260 && !headerShadow) {
        setHeaderShadow(true);
      } else if (e.target.scrollTop < 260 && headerShadow) {
        setHeaderShadow(false);
      }

      set({ st: e.target.scrollTop });
    },
    [headerShadow]
  ); //Update memoized callback when headerShadow state updates
  //-------------------------------------------End

  const [reverseTransitionAnimation, setReverseTransitionAnimation] =
    useState(false);
  const [hideTransitionElement, setHideTransitionElement] = useState(false);
  const [componentReady, setComponentReady] = useState(false);
  const [containerOpacityAnimation, setContainerOpacityAnimation] = useSpring(
    () => ({ opacity: 0 })
  );
  const [headerLeftTranslate, setHeaderLeftTranslate] = useSpring(() => ({
    transform: "translateX(0px)",
  }));
  const leftTranslateHeader = useProjectHeaderTranslate(headerShadow);

  useEffect(() => {
    if (leftTranslateHeader != 0) {
      setHeaderLeftTranslate({
        from: { transform: `translateX(0px)` },
        to: { transform: `translateX(${leftTranslateHeader}px)` },
      });
    } else {
      setHeaderLeftTranslate({ transform: `translateX(0px)` });
    }
  }, [leftTranslateHeader]);

  // On Component Mount
  useEffect(() => {
    console.log(
      "imageRef.current.getBoundingClientRect() >",
      imageRef.current.getBoundingClientRect()
    );
    setDescriptionPageImageRect(imageRef.current.getBoundingClientRect());

    if (isPageRedirectedFromListing) {
      // delays showing of content till page transition animation is occuring
      animationFrameTimeout(() => {
        setContainerOpacityAnimation({ opacity: 1 });
      }, 300);

      animationFrameTimeout(() => {
        setHideTransitionElement(true);
      }, 600);
    } else {
      setContainerOpacityAnimation({ opacity: 1 });
      setHideTransitionElement(true);
    }

    setComponentReady(true);
    // Clears the image and container rect state
    window.history.replaceState(null, location.pathname);
  }, []);

  //When component is about to unmount
  useEffect(() => {
    if (startPageEndAnimation) {
      if (isPageRedirectedFromListing) {
        // start page end animation
        setDescriptionPageImageRect(imageRef.current.getBoundingClientRect());
        setContainerOpacityAnimation({ opacity: 0 });

        animationFrameTimeout(() => {
          setReverseTransitionAnimation(true);
          setHideTransitionElement(false);

          animationFrameTimeout(() => {
            onPageAnimationEnd();
          }, 700);
        }, 200);
      } else {
        onPageAnimationEnd();
      }
    }
  }, [startPageEndAnimation]);

  return (
    <Div row className={styles.project_details_container} style={style}>
      {showViewPagerModal && (
        <Div className={styles.modal_view_pager}>
          <img
            src={closeIcon}
            onClick={() => toggleViewPager(false)}
            className={styles.close_icon}
          />
          <ProjectViewPager projectId={projectId} initialSlide={gridIndex} />
        </Div>
      )}
      <Div
        animate
        flex={2}
        className={styles.left_view_pager_container}
        style={containerOpacityAnimation}
      >
        <ProjectViewPager projectId={projectId} initialSlide={gridIndex} />
      </Div>
      <Div justify row flex={3} className={styles.header_content_container}>
        {/* -------------------------------Header-------------------------------- */}
        <Div
          justify
          align
          animate
          className={`${styles.header_container} ${
            headerShadow ? styles.has_shadow : ""
          }`}
          style={containerOpacityAnimation}
        >
          <Div row justify="space_between" className={styles.header_content}>
            <img
              src={backIcon}
              className={styles.cross_img}
              onClick={() => {
                if (isPageRedirectedFromListing) history.goBack();
                else history.replace("/");
              }}
            />

            {project.link ? (
              <a
                href={project.link.value}
                className={styles.project_link}
                target="_blank"
              >
                {project.link.type}
              </a>
            ) : null}
          </Div>
        </Div>
        {/* -------------------------- Container ------------------------------ */}
        {!isEmpty(project) ? (
          <Div className={styles.container}>
            <Div
              animate
              className={styles.shadow_header}
              style={headerLeftTranslate}
            >
              <ElementScroll
                st={st}
                project={project}
                hideTransitionElement={hideTransitionElement}
                imageRef={imageRef}
                containerOpacityAnimation={containerOpacityAnimation}
                isPageRedirectedFromListing={isPageRedirectedFromListing}
              />
            </Div>

            <animated.div
              className={styles.content_container}
              onScroll={onScroll}
              style={containerOpacityAnimation}
            >
              <ProjectDescription
                className={styles.content}
                project={project}
              />
              <ProjectImageGrid
                projectId={projectId}
                gridItemSelected={(index) => {
                  if (screenSize === "sm" || screenSize === "md") {
                    toggleViewPager(true);
                  }
                  setGridIndex(index);
                }}
              />
            </animated.div>
          </Div>
        ) : null}
      </Div>

      {/* ----------------------------Element Transition---------------------------- */}
      {componentReady && !isEmpty(project) && (
        <ElementTransition
          project={project}
          hideTransitionElement={hideTransitionElement}
          listingPageImageRect={listingPageImageRect}
          listingPageContainerRect={listingPageContainerRect}
          descriptionPageImageRect={descriptionPageImageRect}
          reverseTransitionAnimation={reverseTransitionAnimation}
        />
      )}
    </Div>
  );
};

export default ProjectDetailsPage;
