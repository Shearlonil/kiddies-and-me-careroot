import styled from "styled-components";

export const Wrapper = styled.div`
    #section-2 {
        background-image: linear-gradient(
          to right,
          var(--primary-color),
          var(--secondary-color)
        );
        /* max-width: 1000px; */
        min-height: 100px;
        margin: auto;
        margin-top: -20px;
        /* margin-bottom: 20px; */
        z-index: 31;
        position: relative;
    }

    //////////* SECTION 3 CHILD-1 *//////////
    #section-3 .child-1,
    #section-5 {
        max-width: 600px;
    }

    //////////*  SECTION 3 CHILD-2  *//////////
    #section-3 .child-2 {
        margin-top: 50px;
    }
    #section-3 .child-2 > div > div {
        min-height: 400px;
        width: 350px;
        max-width: 100%;
        line-height: 1.7rem;
        position: relative;
        background-color: white;
        color: black;
        transition: color 0.3s ease-in-out;
        overflow: hidden;
        z-index: 1;
    }
    /* Middle column style */
    #section-3 .child-2 > div:nth-child(2) > div {
        background: var(--bg-gradient);
        color: white;
    }
    /* Sliding background effect for left & right */
    #section-3 .child-2 > div:not(:nth-child(2)) > div::before {
        content: "";
        position: absolute;
        width: 100%;
        height: 0%;
        bottom: 0;
        left: 0;
        background: var(--bg-gradient); /* Green */
        transition: height 0.4s ease-in-out;
        z-index: -1;
    }
    /* Change colors and slide in background on hover (left & right) */
    #section-3 .child-2 > div:not(:nth-child(2)) > div:hover::before {
        height: 100%; /* Slide background from bottom to top */
    }
    #section-3 .child-2 > div:not(:nth-child(2)) > div:hover {
        color: white;
    }
    /* Icon styling */
    #section-3 .child-2 > div > div .icon-bg {
        width: 90px;
        height: 90px;
        background-color: rgba(0, 128, 0, 0.2);
        transition: background-color 0.3s ease-in-out;
    }
    /* Change icon background on hover (left & right) */
    #section-3 .child-2 > div:not(:nth-child(2)) > div:hover .icon-bg {
        background-color: rgba(255, 255, 255, 0.2);
    }
    /* Middle column icon default style */
    #section-3 .child-2 > div:nth-child(2) > div .icon-bg {
        background-color: rgba(255, 255, 255, 0.2);
    }

    //////////* SECTION 4 *//////////
    #section-4 {
        /* width: 100%; */
        background: var(--secondary-color);
    }

    //////////* SECTION 5 *//////////
    #section-5 {
        max-width: 600px;
    }
`;
