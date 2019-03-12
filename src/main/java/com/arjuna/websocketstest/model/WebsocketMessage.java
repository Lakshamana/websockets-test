package com.arjuna.websocketstest.model;

import java.util.Objects;

public class WebsocketMessage {

    private int id;

    private String content;

    private String type;

    public WebsocketMessage() {
    }

    public WebsocketMessage(int id, String content, String type) {
        this.id = id;
        this.content = content;
        this.type = type;
    }

    public int getId() {
        return this.id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getContent() {
        return this.content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getType() {
        return this.type;
    }

    public void setType(String type) {
        this.type = type;
    }

    @Override
    public boolean equals(Object o) {
        if (o == this)
            return true;
        if (!(o instanceof WebsocketMessage)) {
            return false;
        }
        WebsocketMessage websocketMessage = (WebsocketMessage) o;
        return id == websocketMessage.id && Objects.equals(content, websocketMessage.content) && Objects.equals(type, websocketMessage.type);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, content, type);
    }

    @Override
    public String toString() {
        return "{" +
            " id='" + getId() + "'" +
            ", content='" + getContent() + "'" +
            ", type='" + getType() + "'" +
            "}";
    }
}