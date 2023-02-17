function notificate(name) {
    if (Notification.permission !== "granted") {
        const notifications = new Notification("Току-що бе публикувана нова кауза!", {
            body: name
        })
    }
    else {
        const notifications = new Notification("Току-що бе публикувана нова кауза!", {
            body: name
        })
    }
}


