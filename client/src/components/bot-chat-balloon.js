import { LitElement, html } from 'lit-element'
import { scrollToLast } from '../libs/actions.js'

class BotChatBalloon extends LitElement {	
	constructor() {
		super()

		this.text = `TEST`
	}

	render() {
		return html`
			${style}
			<div class="bot-chat">
				<div class='profile'>
					<div class='profile-img'></div>
				</div>
				<div class='name'>하냥이 봇</div>
				<div class='chat-wrap'>
					<!-- <div class='chat-content'>${this.text}</div> -->
					<!-- <div class='chat-content-continue'>TEST-2</div> -->
				</div>
			</div>
		`
	}

	chat(text, config) {
		const NO_CHAT = 0
		const isNoChat = this.shadowRoot.querySelector(`.chat-wrap`).childElementCount === NO_CHAT

		if(isNoChat) {
			this.newChat(text, config)
			return
		}

		this.continueChat(text, config)
	}

	newChat(text) {
		const div = document.createElement(`div`)
		div.classList.add(`chat-content`)
		div.innerHTML = text
		this.shadowRoot.querySelector(`.chat-wrap`).appendChild(div)
		scrollToLast()
	}

	continueChat(text) {
		const div = document.createElement(`div`)
		div.classList.add(`chat-content-continue`)
		div.innerHTML = text
		this.shadowRoot.querySelector(`.chat-wrap`).appendChild(div)
		scrollToLast()
	}
}

customElements.define(`bot-chat-balloon`, BotChatBalloon)

const style = html`
<style>
bot-chat-balloon {
	width: 100%;
	min-height: min-content;
}

.bot-chat {
	display: grid;
	grid-template-columns: min-content 1fr;
	grid-template-rows: min-content 1fr;
	grid-template-areas: 
		"a b"
		"a c";
	min-height: 70px;
}	

.bot-chat .profile {
	padding: 15px 10px 15px 15px;
	grid-area: a;
	z-index: 10;
}

.bot-chat .profile-img {
	width: 50px;
    height: 50px;
    border-radius: 25px;
    background-image: url(./img/hanyang.png);
    background-repeat: no-repeat;
    background-position-y: -3px;
    background-position-x: center;
    background-size: 75px;
}

.bot-chat .name {
	grid-area: b;
	font-size: 12px;
	color: #6f6f6f;
	padding-top: 12px;
}

.bot-chat .chat-wrap {
	grid-area: c;
	padding-top: 5px;
	padding-bottom: 5px;
	z-index: 5;

	display: grid;
	grid-template-rows: 1fr;
	grid-row-gap: 5px;
}

.bot-chat .chat-content, .bot-chat .chat-content-continue {
	display: inline-block;
	position: relative;
	min-height: 20px;
	height: fit-content;
	min-width: 20px;
	width: fit-content;
	max-width: calc(100vw - 80px);		
	background: white;
	padding: 5px 10px 5px 10px;
	box-sizing: border-box;
	font-size: 13px;
	color: #515151;

	box-shadow: 3px 6px 8px 0 rgba(132, 161, 255, 0.18);
	padding-left: 15px;
    padding-right: 15px;

	animation: slide 0.3s ease-out;			
}

.chat-content {
	border-radius: 2px 15px 15px 16px;
}

.chat-content-continue {
	border-radius: 10px 15px 15px 15px;
}

.bot-chat ::selection {
	background-color: yellow;
}

@keyframes slide {
	0% {
		left: -100%;
	}

	100% {
		left: 0%;
	}
}
</style>
`
