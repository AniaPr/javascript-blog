'use strict';

const templates = {
  articleLink: Handlebars.compile(
    document.querySelector('#template-article-link').innerHTML
  ),
  tagLink: Handlebars.compile(
    document.querySelector('#template-tag-link').innerHTML
  ),
  articleAuthor: Handlebars.compile(
    document.querySelector('#template-article-author').innerHTML
  ),
  tagCloudLink: Handlebars.compile(
    document.querySelector('#template-tag-cloud-link').innerHTML
  ),
  authorLink: Handlebars.compile(
    document.querySelector('#template-author-link').innerHTML
  ),
};

const opts = {
  articleAuthorSelector: '.post-author',
  articleSelector: '.post',
  titleSelector: '.post-title',
  titleListSelector: '.titles',
  articleTagsSelector: '.post-tags .list',
  tagsListSelector: '.tags.list',
  cloudClassCount: '4',
  cloudClassPrefix: 'tag-size-',
  authorListSelector: '.authors.list',
};

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

function generateTitleLinks(customSelector = '') {
  /* [DONE] remove contents of titleList */

  const titleList = document.querySelector(opts.titleListSelector);
  titleList.innerHTML = '';

  /* [DONE] find all the articles and save them to variable: articles */

  const articles = document.querySelectorAll(
    opts.articleSelector + customSelector
  );
  console.log(opts.articleSelector + customSelector);

  /* [DONE] for each article */

  let html = '';

  for (let article of articles) {
    /* [DONE] get the article id */

    const articleId = article.getAttribute('id');

    /* [DONE] find the title element and get the title from the title element */

    const articleTitle = article.querySelector(opts.titleSelector).innerHTML;

    /* [DONE] create HTML of the link */

    const linkHTMLData = { id: articleId, title: articleTitle };
    const linkHTML = templates.articleLink(linkHTMLData);

    /* [DONE] insert link into titleList */

    html = html + linkHTML;
  }

  titleList.innerHTML = html;

  const links = document.querySelectorAll('.titles a');
  console.log(links);

  for (let link of links) {
    link.addEventListener('click', titleClickHandler);
  }
}

generateTitleLinks();

function calculateTagsParams(tags) {
  const params = { max: '0', min: '999999' };

  for (let tag in tags) {
    console.log(tag + ' is used ' + tags[tag] + ' times');

    if (tags[tag] > params.max) {
      params.max = tags[tag];
    }

    if (tags[tag] < params.min) {
      params.min = tags[tag];
    }

    /* params.max = Math.max(tags[tag], params.max);
    params.min = Math.min(tags[tag], params.min); */
  }

  return params;
}

function calculateTagClass(count, params) {
  const normalizedCount = count - params.min;

  const normalizedMax = params.max - params.min;

  const percentage = normalizedCount / normalizedMax;

  const classNumber = Math.floor(percentage * (opts.cloudClassCount - 1) + 1);

  return opts.cloudClassPrefix + classNumber;
}

function generateTags() {
  /* [NEW] create a new variable allTags with an empty object */
  let allTags = {};

  /* [DONE] find all articles */

  const articles = document.querySelectorAll(opts.articleSelector);
  console.log(articles);

  /* [DONE] START LOOP: for every article: */

  for (let article of articles) {
    /* [DONE] find tags wrapper */

    const tagWrapper = article.querySelector(opts.articleTagsSelector);

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

      const htmlTagData = { tag: tag, tag: tag };
      const htmlTag = templates.tagLink(htmlTagData);

      /* [DONE] add generated code to html variable */

      html = html + htmlTag;
      console.log(html);

      /* [NEW] check if this link is NOT already in allTags */
      if (!allTags.hasOwnProperty(tag)) {
        /* [NEW] add tag to allTags object */
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }

      /* END LOOP: for each tag */
    }
    /* [DONE] insert HTML of all the links into the tags wrapper */

    tagWrapper.innerHTML = html;
    console.log(tagWrapper);

    /* END LOOP: for every article: */
  }

  /* [NEW] find list of tags in right column */
  const tagList = document.querySelector(opts.tagsListSelector);
  console.log(tagList);

  /* [NEW] find extreme number of tag's occurance */

  const tagsParams = calculateTagsParams(allTags);
  console.log('tagsParams:', tagsParams);

  /* [NEW] create variable for all links HTML code */

  const allTagsData = { tags: [] };

  /* [NEW] START LOOP: for each tag in allTags: */
  for (let tag in allTags) {
    /* [NEW] generate code of a link and add it to allTagHTML */

    allTagsData.tags.push({
      tag: tag,
      className: calculateTagClass(allTags[tag], tagsParams),
    });
  }

  tagList.innerHTML = templates.tagCloudLink(allTagsData);
  console.log(allTagsData);
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

  const tagLinks = document.querySelectorAll('a.active[href^="#tag-"]');
  console.log(tagLinks);

  /* START LOOP: for each active tag link */

  for (let tagLink of tagLinks) {
    /* [DONE] remove class active */

    tagLink.classList.remove('active');
    console.log(tagLink);

    /* END LOOP: for each active tag link */
  }

  /* [DONE] find all tag links with "href" attribute equal to the "href" constant */

  const targetTags = document.querySelectorAll('a[href="' + href + '"]');
  console.log(targetTags);

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
  /* [NEW] create a new wariable allAuthors with empty object */

  let allAuthors = {};

  /* [DONE] find all articles */

  const articles = document.querySelectorAll(opts.articleSelector);

  /* START LOOP: for every article : */

  for (let article of articles) {
    /* [DONE} find authors wrapper */

    const authorsWrapper = article.querySelector(opts.articleAuthorSelector);

    /* [DONE] get author form data-author attribute*/

    const articleAuthor = article.getAttribute('data-author');
    console.log(articleAuthor);

    /* [DONE] generate HTML of the link */

    const authorLinkData = { author: articleAuthor, author: articleAuthor };
    const authorLink = templates.articleAuthor(authorLinkData);

    /* [NEW] check if this link is NOT already in allAuthors */

    if (!allAuthors.hasOwnProperty(articleAuthor)) {
      /* [NEW] add author to allAuthor object  */
      allAuthors[articleAuthor] = 1;
    } else {
      allAuthors[articleAuthor]++;
    }

    /* [DONE] insert HTML of the link into the authors wrapper */

    authorsWrapper.innerHTML = authorLink;
    console.log(authorsWrapper);
  }

  /* [NEW] find list of authors in right column */

  const authorList = document.querySelector(opts.authorListSelector);

  /* [NEW] create variable for all links HTML code */

  //let allAuthorsHTML = '';
  const authorsHtmlData = { authors: [] };

  /* [NEW] START LOOP: for each article author in allArticles: */

  for (let articleAuthor in allAuthors) {
    /* [NEW] END LOOP: for each article author in allaArticles */

    authorsHtmlData.authors.push({
      author: articleAuthor,
      count: allAuthors[articleAuthor],
    });
  }

  /* [NEW] add html from allAuthorsHTML to authorList */

  authorList.innerHTML = templates.authorLink(authorsHtmlData);
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

  const author = href.replace('#author-', '');
  console.log(author);

  /* [DONE] find all author links with class active */

  const authorLinks = document.querySelectorAll('a.active[href^="#author-"]');
  console.log(authorLinks);

  /* START LOOP: for each active author link */

  for (let authorLink of authorLinks) {
    /* [DONE] remove class active */

    authorLink.classList.remove('active');
    console.log(authorLink);

    /* END LOOP: for each active author link */
  }
  /* [DONE] find all author links with "href" attribute equal to the "href" constant */

  const targetAuthors = document.querySelectorAll('a[href="' + href + '"]');
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

function addClickListenersToAuthors() {
  /* [DONE] find all links to authors */

  const linksToAuthors = document.querySelectorAll('a[href^="#author-"]');

  /* START LOOP: for each link */

  for (let linksToAuthor of linksToAuthors) {
    /* [DONE] add tagClickHandler as event listener for that link */
    linksToAuthor.addEventListener('click', authorClickHandler);
  }
  /* END LOOP: for each link */
}

addClickListenersToAuthors();
