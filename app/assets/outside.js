<script>

        app.ports.infoForOutside.subscribe(msg => {

          console.log("app.ports.infoForOutside")

          switch(msg.tag) {

            case "DocumentData":
            console.log("DocumentData")
            if (msg.data != null) {
                localStorage.setItem("currentDocument", JSON.stringify(msg.data));
            }
            break;

            case "DocumentListData":
            console.log("DocumentListData")
            if (msg.data != null) {
                localStorage.setItem("currentDocumentList", JSON.stringify(msg.data));
            }
            break;

            case "DocumentQueueData":
            console.log("DocumentQueueData")
            if (msg.data != null) {
                localStorage.setItem("recentDocumentQueue", JSON.stringify(msg.data));
            }
            break;

            case "AskToReconnectDocument":
            console.log("AskToReconnectDocument")
            if (localStorage.currentDocument != null && localStorage.currentDocument[0] !='[') {
                app.ports.infoForElm.send({tag: "ReconnectDocument", data: JSON.parse(localStorage.currentDocument)})
            }
            break;

            case "AskToReconnectDocumentList":
            console.log("AskToReconnectDocumentList")
            if (localStorage.currentDocumentList != null ) {
                app.ports.infoForElm.send({tag: "ReconnectDocumentList", data: JSON.parse(localStorage.currentDocumentList)})
            }
            break;

            case "AskToReconnectRecentDocumentQueue":
            console.log("AskToReconnectRecentDocumentQueue")
            if (localStorage.recentDocumentQueue != null ) {
                console.log("queue: " + localStorage.recentDocumentQueue)
                console.log("json: " + JSON.parse(localStorage.recentDocumentQueue))
                app.ports.infoForElm.send({tag: "ReconnectDocumentQueue", data: JSON.parse(localStorage.recentDocumentQueue)})
            }
            break;

            case "UserData":
            console.log("UserData")
            if (msg.data != null) {
            localStorage.setItem("currentUser", JSON.stringify(msg.data));
            }
            break;

            case "AskToReconnectUser":
            console.log("AskToReconnectUser")
            if (localStorage.currentUser != null) {
                app.ports.infoForElm.send({tag: "ReconnectUser", data: JSON.parse(localStorage.currentUser)})
            }
            break;

            case "AskToEraseLocalStorage":
                console.log("AskToEraseLocalStorage")
                localStorage.setItem("currentUser", null);
                localStorage.setItem("currentDocument", null);
                localStorage.setItem("currentDocumentList", null);
                localStorage.setItem("recentDocumentQueue", null);
            break;

        }

    })

</script>