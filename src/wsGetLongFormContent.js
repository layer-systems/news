const socket = new WebSocket('wss://relay.damus.io');

socket.onopen = function(event) {
    socket.send('["REQ", "133742069", {"kinds": [30023]}]');
};

socket.onmessage = function(event) {
    const data = JSON.parse(event.data);
    if (data[0] === "EVENT") {
        if(data[2].kind === 30023) {
            // console.log(data[2])
            const content = data[2].content;
            const created_at = data[2].created_at;
            const id = data[2].id;
            const pubkey = data[2].pubkey;
            const sig = data[2].sig;
            const tags = data[2].tags;

            let title = "";
            let summary = "";
            let image = "";
            for(const tag of tags) {
                if(tag[0] === "title") {
                    title = tag[1];
                }
                if(tag[0] === "summary") {
                    summary = tag[1];
                }
                if(tag[0] === "image") {
                    image = tag[1];
                }
            }


            var divCol = document.createElement('div');
            divCol.setAttribute('class', 'col');
            var divCard = document.createElement('div');
            divCard.setAttribute('class', 'card shadow-sm');
            var divCardBody = document.createElement('div');
            divCardBody.setAttribute('class', 'card-body');
            var pCardText = document.createElement('p');
            pCardText.setAttribute('class', 'card-text');
            pCardText.innerHTML = summary;
            var divBtnFlex = document.createElement('div');
            divBtnFlex.setAttribute('class', 'd-flex justify-content-between align-items-center');
            var divBtnGroup = document.createElement('div');
            divBtnGroup.setAttribute('class', 'btn-group');
            // for(const tag of tags) {
            //     divBtnGroup.innerHTML +=
            //     `<button type="button" class="btn btn-sm btn-outline-secondary" onclick="location.href='nostr://${id}';">${tag}</button>`;
            // }
            var smallText = document.createElement('small');
            smallText.setAttribute('class', 'text-body-secondary');
            smallText.innerHTML = title;

            var smallTextId = document.createElement('small');
            smallTextId.setAttribute('class', 'text-body-secondary');
            smallTextId.innerHTML = id;

            divBtnFlex.appendChild(divBtnGroup);
            divBtnFlex.appendChild(smallText);
            divCardBody.appendChild(pCardText);
            divCardBody.appendChild(divBtnFlex);
            divCardBody.appendChild(smallTextId);

            divCard.appendChild(divCardBody);
            divCol.appendChild(divCard);
            document.getElementById('lfc-row').appendChild(divCol);
        }
    }
};