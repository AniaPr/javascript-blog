'use strict';

function titleClickHandler(event) {
  event.preventDefault();
  const clickedElement = this;
  console.log('Link was clicked!');

  /* [DONE] remove class 'active' from all article links  */

  const activeLinks = document.querySelectorAll('.titles a.active');

  for (let activeLink of activeLinks) {
    activeLink.classList.remove('active');
  }

  /* [DONE] add class 'active' to the clicked link */

  clickedElement.classList.add('active');
  console.log('clickedElement:', clickedElement);

  /* [DONE] remove class 'active' from all articles */

  const activeArticles = document.querySelectorAll('.post.active');

  for (let activeArticle of activeArticles) {
    activeArticle.classList.remove('active');
  }

  /* [DONE] get 'href' attribute from the clicked link */

  const articleSelector = clickedElement.getAttribute('href');
  console.log(articleSelector);

  /* find the correct article using the selector (value of 'href' attribute) */

  const targetArticle = document.querySelector(articleSelector);
  console.log(targetArticle);

  /* add class 'active' to the correct article */

  targetArticle.classList.add('active');
}

const optArticleAuthorSelector = '.post-author',
  optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list';

function generateTitleLinks(customSelector = '') {
  console.log(customSelector);

  /* [DONE] remove contents of titleList */

  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';

  /* [DONE] find all the articles and save them to variable: articles */

  let html = '';

  /* [DONE] for each article */

  const articles = document.querySelectorAll(
    optArticleSelector + customSelector
  );
  console.log(optArticleSelector + customSelector);

  for (let article of articles) {
    /* [DONE] get the article id */

    const articleId = article.getAttribute('id');
    console.log(articleId);

    /* [DONE] find the title element and get the title from the title element */

    const articleTitle = article.querySelector(optTitleSelector).innerHTML;

    /* [DONE] create HTML of the link */

    const linkHTML =
      '<li><a href="#' +
      articleId +
      '"><span>' +
      articleTitle +
      '</span></a></li>';
    console.log(linkHTML);

    /* [DONE] insert link into titleList */

    html = html + linkHTML;
    console.log(html);
  }

  titleList.innerHTML = html;

  const links = document.querySelectorAll('.titles a');
  console.log(links);

  for (let link of links) {
    link.addEventListener('click', titleClickHandler);
  }
}

generateTitleLinks();

function generateTags() {
  /* [DONE] find all articles */

  const articles = document.querySelectorAll(optArticleSelector);
  console.log(articles);

  /* [DONE] START LOOP: for every article: */

  for (let article of articles) {
    /* [DONE] find tags wrapper */

    const tagWrapper = article.querySelector(optArticleTagsSelector);

    /* [DONE] make html variable with empty string */

    let html = '';

    /* [DONE] get tags from data-tags attribute */

    const articleTags = article.getAttribute('data-tags');
    console.log(articleTags);

    /* [DONE] split tags into array */

    const articleTagsArray = articleTags.split(' ');
    console.log(articleTagsArray);

    /* START LOOP: for each tag */

    for (let tag of articleTagsArray) {
      console.log(tag);

      /* [DONE] generate HTML of the link */

      const htmlLink = ' <li><a href="#tag-' + tag + '">' + tag + '</a></li>';
      console.log(htmlLink);

      //<li><a href="#tag-cat">cat</a></li>

      /* [DONE] add generated code to html variable */

      html = html + htmlLink;
      console.log(html);

      /* END LOOP: for each tag */
    }
    /* [DONE] insert HTML of all the links into the tags wrapper */

    tagWrapper.innerHTML = html;
    console.log(tagWrapper);

    /* END LOOP: for every article: */
  }
}

generateTags();

function tagClickHandler(event) {
  /* [DONE] prevent default action for this event */

  event.preventDefault();

  /* [DONE] make new constant named "clickedElement" and give it the value of "this" */

  const clickedElement = this;
  console.log('Tag was clicked!');

  /* [DONE] make a new constant "href" and read the attribute "href" of the clicked element */

  const href = clickedElement.getAttribute('href');
  console.log(href);

  /* [DONE] make a new constant "tag" and extract tag from the "href" constant */

  const tag = href.replace('#tag-', '');
  console.log(tag);

  /* [DONE] find all tag links with class active */

  const tagLinks = document.querySelectorAll('a[href="' + href + '"]');
  console.log(tagLinks);

  /* START LOOP: for each active tag link */

  for (let tagLink of tagLinks) {
    /* [DONE] remove class active */

    tagLink.classList.remove('active');
    console.log(tagLink);

    /* END LOOP: for each active tag link */
  }

  /* [DONE] find all tag links with "href" attribute equal to the "href" constant */

  const targetTags = document.querySelectorAll(href);

  /* START LOOP: for each found tag link */

  for (let targetTag of targetTags) {
    /* [DONE] add class active */

    targetTag.classList.add('active');
    console.log(targetTag);
    /* END LOOP: for each found tag link */
  }
  /* [DONE] execute function "generateTitleLinks" with article selector as argument */

  generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags() {
  /* [DONE] find all links to tags */

  const linkToTags = document.querySelectorAll('a[href^="#tag-"]');

  /* START LOOP: for each link */

  for (let linkToTag of linkToTags) {
    /* [DONE] add tagClickHandler as event listener for that link */
    linkToTag.addEventListener('click', tagClickHandler);
  }
  /* END LOOP: for each link */
}

addClickListenersToTags();

function generateAuthors() {
  /* [DONE] find all articles */

  const articles = document.querySelectorAll(optArticleSelector);

  /* START LOOP: for every article : */

  for (let article of articles) {
    /* [DONE} find authors wrapper */

    const authorsWrapper = article.querySelector(optArticleAuthorSelector);

    /* [DONE] get author form data-author attribute*/

    const getAuthor = article.getAttribute('data-author');
    console.log(getAuthor);

    /* [DONE] generate HTML of the link */

    const htmlLink =
      ' <a href="#author-' + getAuthor + '">' + getAuthor + '</a>';
    console.log(htmlLink);

    /* [DONE] make html variable with empty string */

    let html = '';

    /* [DONE] add generated code to html variable */

    html = html + htmlLink;
    console.log(html);

    /* [DONE] insert HTML of all the links into the author wrapper */

    authorsWrapper.innerHTML = html;
    console.log(authorsWrapper);
  }
}

generateAuthors();

function authorClickHandler(event) {
  event.preventDefault();
  const clickedElement = this;
  console.log('Author was clicked!');

  /* [DONE] make a new constant "href" and read the attribute "href" of the clicked element */

  const href = clickedElement.getAttribute('href');
  console.log(href);

  /* [DONE] make a new constant "author" and extract author from the "href" constant */

  const author = href.replace('#tag-', '');
  console.log(author);

  /* [DONE] find all author links with class active */

  const authorLinks = document.querySelectorAll('a[href="' + href + '"]');
  console.log(authorLinks);

  /* START LOOP: for each active author link */

  for (let authorLink of authorLinks) {
    /* [DONE] remove class active */

    authorLink.classList.remove('active');
    console.log(authorLink);

    /* END LOOP: for each active author link */
  }
  /* [DONE] find all author links with "href" attribute equal to the "href" constant */

  const targetAuthors = document.querySelectorAll(href);
  console.log(targetAuthors);

  /* START LOOP: for each found author link */

  for (let targetAuthor of targetAuthors) {
    /* [DONE] add class active */

    targetAuthor.classList.add('active');
    console.log(targetAuthor);
    /* END LOOP: for each found tag link */
  }
  /* [DONE] execute function "generateTitleLinks" with article selector as argument */

  generateTitleLinks('[data-author="' + author + '"]');
}
