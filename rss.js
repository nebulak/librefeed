
function loadRss() {
  const DOMPARSER = new DOMParser().parseFromString.bind(new DOMParser())
  /* Fetch URLs from JSON */
  fetch('urls.json').then((res) => {
  	res.text().then((data) => {
  		var frag = document.createDocumentFragment()
  		var hasBegun = true
  		JSON.parse(data).urls.forEach((u) => {
  			try {
  				var url = new URL(u)
  			}
  			catch (e) {
  				console.error('URL invalid');
  				return
  			}
  			fetch(url).then((res) => {
  				res.text().then((htmlTxt) => {
  					/* Extract the RSS Feed URL from the website */
  					try {
  						let doc = DOMPARSER(htmlTxt, 'text/html')
  						var feedUrl = doc.querySelector('link[type="application/rss+xml"]').href
  					} catch (e) {
  						console.error('Error in parsing the website');
  						return
  					}
  					/* Fetch the RSS Feed */
  					fetch(feedUrl).then((res) => {
  						res.text().then((xmlTxt) => {
  							/* Parse the RSS Feed and display the content */
  							try {
  								let doc = DOMPARSER(xmlTxt, "text/xml")
  								let heading = document.createElement('h1')
  								heading.textContent = url.hostname
  								frag.appendChild(heading)
  								doc.querySelectorAll('item').forEach((item) => {
  									let temp = document.importNode(document.querySelector('template').content, true);
  									let i = item.querySelector.bind(item)
  									let t = temp.querySelector.bind(temp)
  									//t('h2').textContent = !!i('title') ? i('title').textContent : '-'
  									t('a').textContent = !!i('title') ? i('title').textContent : '-';
                    t('a').href = !!i('link') ? i('link').textContent : '#'
                    //t('a').onclick = showArticle("' + t('a').textContent);//'showArticle("' + t('a').textContent + '");';
  									t('p').innerHTML = !!i('description') ? i('description').textContent : '-'
  									//t('h3').textContent = url.hostname
  									frag.appendChild(temp);

                    var source_link = i('link').textContent;
                    fetchContent(source_link);




                    /*
                    fetch(source_link).then((res) => {
                      console.log("fetched source");
                      res.text().then((source_data) => {
                        console.log("got text");
                        //let doc = DOMPARSER(data, "text/xml");
                        var parser = new DOMParser();
                        var doc = parser.parseFromString(source_data, 'text/html');
                        var article = new Readability(doc).parse();
                        localStorage.setItem(btoa(source_link), btoa(article.textContent));
                    });
  								});
                  */
                });
  							} catch (e) {
  								console.error('Error in parsing the feed')
  							}
  							if(hasBegun) {
  								document.querySelector('feedlist').textContent = '';
  								hasBegun = false;
  							}
  							document.querySelector('feedlist').appendChild(frag)
  						})
  					}).catch(() => console.error('Error in fetching the RSS feed'))
  				})
  			}).catch(() => console.error('Error in fetching the website'))
  		})
  	})
  }).catch(() => console.error('Error in fetching the URLs json'))

}

var articleStore = {
  articles: [],
  push: function (articleObj) {
    this.articles.push(articleObj);
  }
};

class articleObject {
  constructor (title, link, content) {
    this.title = title;
    this.link = link;
    this.content = content;
  }
}

async function fetchContent(link) {
  let source_response = await fetch(link);
  //console.log("fetched source");
  let source_text = await source_response.text();
    let parser = new DOMParser();
    let doc = parser.parseFromString(source_text, 'text/html');
    let article = new Readability(doc).parse();
    console.log(link);
    let art = new articleObject(article.title, link, article.content);
    articleStore.push(art);
    console.log(JSON.stringify(articleStore.articles));
    //localStorage.setItem(btoa(link), btoa(article.textContent));
}

function showArticle(link) {
  for(let i=0; i < articleStore.length; i++)
  {
    if(articleStore.articles[i].link == link)
    {
      alert(articleStore.articles[i].content);
    }
  }
}
