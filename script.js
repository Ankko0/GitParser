/* Колонки таблицы. columnGroupShow open -  разворачиваемое поле. По умлочанию скрыто. */
var columnDefs = [
    {
        headerName: "Repos Details",
        children: [
            {field: "id", sort: "desc"},
            {field: "node_id", columnGroupShow: "open"},
            {field: "name"},
            {field: "full_name"},
            {field: "html_url", cellRenderer: MakeClickable},
            {field: "private"}]
    },
    {
        headerName: "Owner details",
        children: [
            {field: "login"},
            {field: "ownerId"},
            {field: "ownerNode_id", columnGroupShow: "open"},
            {field: "avatar_url", cellRenderer: MakeClickable},
            {field: "gravatar_id", columnGroupShow: "open"},
            {field: "url", columnGroupShow: "open"},
            {field: "ownerHtml_url", cellRenderer: MakeClickable},
            {field: "followers_url", columnGroupShow: "open", cellRenderer: MakeClickable},
            {field: "following_url", columnGroupShow: "open", cellRenderer: MakeClickable},
            {field: "gists_url", columnGroupShow: "open", cellRenderer: MakeClickable},
            {field: "starred_url", columnGroupShow: "open", cellRenderer: MakeClickable},
            {field: "subscriptions_url", columnGroupShow: "open", cellRenderer: MakeClickable},
            {field: "organizations_url", columnGroupShow: "open", cellRenderer: MakeClickable},
            {field: "repos_url", columnGroupShow: "open", cellRenderer: MakeClickable},
            {field: "events_url", columnGroupShow: "open", cellRenderer: MakeClickable},
            {field: "received_events_url", columnGroupShow: "open", cellRenderer: MakeClickable},
            {field: "type"},
            {field: "site_admin"}
        ]
    }
];

/* Опции таблицы*/
var gridOptions = {
    columnDefs: columnDefs,
    defaultColDef: {
        width: 170,
        sortable: true,
        editable: true
    }
};

/* Создание кликабельной ссылки. params - значение из выбранной ячейки к которой привязана функция.*/
function MakeClickable(params) {
    return '<a href=\"'+params.value+'\" target=\"_blank\" rel=\"noopener\">'+ params.value+'</a>';
}

/* Создание ag-grid таблицы на странице. Данные парсятся с https://api.github.com/repositories */
document.addEventListener("DOMContentLoaded", function () {
    var rowsCount = parseInt(window.location.search.match(/\d+/)[0]);
    var gridDiv = document.querySelector("#myGrid");
    new agGrid.Grid(gridDiv, gridOptions);
    agGrid
        .simpleHttpRequest({
            url:
                "https://api.github.com/repositories",
        })
        .then(function (data) {
            var result = [];
            for (var i = 0; i < rowsCount; i++) {
                var item = data[i];
                // Подсчет звезд и форков. Работает только платно (Ограничение api.github на кол-во запросов).
                // var starsCount = 0;
                // var forksCount = 0;
                // $.ajaxSetup({
                //     async: false
                // });
                // $.getJSON(item.url, function (data) {
                //     debugger
                //     console.log(data);
                //     starsCount = data.stargazers_count;
                //     forksCount = data.forks_count;
                // });
                // $.ajaxSetup({
                //     async: true
                // });
                var record = {
                    "id": item.id,
                    "node_id": item.node_id,
                    "name": item.name,
                    "full_name": item.full_name,
                    "html_url": item.html_url,
                    "private": item.private,
                    "login": item.owner.login,
                    "ownerId": item.owner.id,
                    "ownerNode_id": item.owner.node_id,
                    "avatar_url": item.owner.avatar_url,
                    "gravatar_id": item.owner.gravatar_id,
                    "url": item.owner.url,
                    "ownerHtml_url": item.owner.html_url,
                    "followers_url": item.owner.followers_url,
                    "following_url": item.owner.following_url,
                    "gists_url": item.owner.gists_url,
                    "starred_url": item.owner.starred_url,
                    "subscriptions_url": item.owner.subscriptions_url,
                    "organizations_url": item.owner.organizations_url,
                    "repos_url": item.owner.repos_url,
                    "events_url": item.owner.events_url,
                    "received_events_url": item.owner.received_events_url,
                    "type": item.owner.type,
                    "site_admin": item.owner.site_admin
                    // "stars": starsCount,
                    // "forks": forksCount
                }

                result.push(record);
            }
            gridOptions.api.setRowData(result);
        })

})
