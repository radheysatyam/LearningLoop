import React, { useState } from 'react';
import styles from '@/styles/Html.module.css';
import Footer from '../../footer';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Html from './html';
import data from './html.json';
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { zTouch } from "react-syntax-highlighter/dist/cjs/styles/prism";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-monokai";
import { LuCopy } from 'react-icons/lu';
import { useContext } from 'react';
import { ThemeContext } from '@/pages/context/themeContext';

const HtmlBasic = () => {

  const { theme } = useContext(ThemeContext);

  const [currentIndex, setCurrentIndex] = useState(3);

  const router = useRouter();
  const { push } = router;

  
  const handleNext = () => {
    if (currentIndex < data.myObj.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleCopyClick = () => {
    // Copy the code to the clipboard
    const el = document.createElement("textarea");
    el.value = code;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
    setCopyText("Copied");

    setTimeout(() => {
      setCopyText("Copy");
    }, 2000);
  };

  const [code, setCode] = useState(
    '<!DOCTYPE html>\n<html>\n <head> \n<title>Page Title</title> \n</head>\n <body>\n<h1>This is a Heading</h1>\n <p>This is a paragraph.</p>\n </body> \n</html>'
  );

  const [selectedLanguage, setSelectedLanguage] = useState("html");
  const [copyText, setCopyText] = useState("Copy");

  return (
    <div className={`${styles.learn}`}>
      <Html />
      <div className={`${styles.learncont}`} id='sidecont'>
        <h2 className={`text-center text-${theme === 'light'?'black':'white'} ${styles.h2html}`}>HTML Tutorial</h2>
        <div className={`${styles.nextprev}`}>
          <Link href={`/learn/html/${data.myObj[currentIndex]}`} onClick={handlePrev} className={`${styles.button} btn btn-primary`}>&lt; Prev</Link>
          <Link href={`/learn/html/html-home`} onClick={handleNext} className={`${styles.button} btn btn-primary`}>Next &gt;</Link>
        </div>
        <div className={`${styles.languegecourse} text-${theme === 'light'?'black':'white'} px-5 py-5`}>
          <h5 className={`text-left text-white`}>GET OUR FREE HTML COURSE</h5>
          <p className={`text-left text-white`}>In this course you will learn HTML from basic to advanced.</p>
          <Link href="/learn" target='_blank'><input type="button" value="Go to the Course" className={`btn btn-primary`} /></Link>
        </div>
        <div className={`px-3 ${styles.docpage}`}>
          <p className={`text-${theme === 'light'?'black':'white'}`}>Welcome to our HTML tutorial, your go-to resource for mastering the art of web development with HTML. Whether you&apos;re a beginner taking your first steps into the world of coding or an experienced developer looking to brush up on your skills, we&apos;ve got you covered.<br /><br />Here is an example of simple HTML code...</p>
        </div>
        <div style={{ position: "relative" }} className={`px-3`}>
          <button
            onClick={handleCopyClick}
            style={{
              position: "absolute",
              top: 10,
              right: 20,
              background: "#0a143c",
              color: "white",
              border: "none",
              padding: "5px 10px",
              cursor: "pointer",
            }}>
            <span><LuCopy/> {copyText}</span>
          </button>
          <SyntaxHighlighter language={selectedLanguage} style={zTouch}>
            {code}
          </SyntaxHighlighter>
          <div>
            <Link href={`/html-code-editor?code=${encodeURIComponent(code)}`} target="_blank">
              <input type="button" value="Try Yourself" className={`btn btn-primary`} />
            </Link>
          </div>
        </div>
        <div className={`px-3 ${styles.docpage}`}>
          <p className={`text-${theme === 'light'?'black':'white'}`}>Here, you&apos;ll find a comprehensive collection of HTML tags, attributes, and best practices, presented in a clear and user-friendly format. Our goal is to empower you to create stunning and functional web pages with ease. Explore our well-organized tutorials, examples, and reference materials to enhance your HTML knowledge and unlock the full potential of web design and development. Happy coding!</p>
        </div>
        <div className={`${styles.nextprev}`}>
          <Link href={`/learn/html/${data.myObj[currentIndex]}`} onClick={handlePrev} className={`${styles.button} btn btn-primary`}>&lt; Prev</Link>
          <Link href={`/learn/html/html-home`} onClick={handleNext} className={`${styles.button} btn btn-primary`}>Next &gt;</Link>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default HtmlBasic;
