"use strict";

function titleClickHandler(event) {
	event.preventDefault();
	const clickedElement = this;
	console.log("Link was clicked!");

	/* [DONE] remove class 'active' from all article links  */

	const activeLinks = document.querySelectorAll(".titles a.active");

	for (let activeLink of activeLinks) {
		activeLink.classList.remove("active");
	}

	/* [DONE] add class 'active' to the clicked link */

	clickedElement.classList.add("active");
	console.log("clickedElement:", clickedElement);

	/* [DONE] remove class 'active' from all articles */

	const activeArticles = document.querySelectorAll(".post.active");

	for (let activeArticle of activeArticles) {
		activeArticle.classList.remove("active");
	}

	/* [DONE] get 'href' attribute from the clicked link */

	const articleSelector = clickedElement.getAttribute("href");
	console.log(articleSelector);

	/* find the correct article using the selector (value of 'href' attribute) */

	const targetArticle = document.querySelector(articleSelector);
	console.log(targetArticle);

	/* add class 'active' to the correct article */

	targetArticle.classList.add("active");
}

const optArticleSelector = ".post",
	optTitleSelector = ".post-title",
	optTitleListSelector = ".titles";

function generateTitleLinks() {
	console.log("Function done");

	/* [DONE] remove contents of titleList */

	const titleList = document.querySelector(optTitleListSelector);
	titleList.innerHTML = "";

	/* [DONE] find all the articles and save them to variable: articles */

	let html = "";

	/* [DONE] for each article */

	const articles = document.querySelectorAll(optArticleSelector);
	for (let article of articles) {
		/* [DONE] get the article id */

		const articleId = article.getAttribute("id");
		console.log(articleId);

		/* [DONE] find the title element */

		const articleTitle = article.querySelector(optTitleSelector).innerHTML;

		/*  [DONE] get the title from the title element */

		const getTitle = article.getAttribute(articleTitle);

		/* [DONE] create HTML of the link */

		const linkHTML =
			'<li><a href="#' +
			articleId +
			'"><span>' +
			articleTitle +
			"</span></a></li>";
		console.log(linkHTML);

		/* [DONE] insert link into titleList */

		html = html + linkHTML;
		console.log(html);
	}

	titleList.innerHTML = html;

	const links = document.querySelectorAll(".titles a");
	console.log(links);

	for (let link of links) {
		link.addEventListener("click", titleClickHandler);
	}
}

generateTitleLinks();
