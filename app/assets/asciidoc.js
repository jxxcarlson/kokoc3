<script>

    // https://ellie-test-19-cutover.now.sh/LFVgrr8Cf2a1

    var asciidoctor = Asciidoctor();

    customElements.define('asciidoc-text', class extends HTMLElement {
        constructor() {
            super()
            this._content = this.content
        }

        get content() {
            return this._content
        }

        set content(value) {
            if (this._content === value) return
            this._content = value

            var jaxScript = this.querySelector('script')
            if (!jaxScript) return
            jaxScript.textContent = this._content
            enqueueUpdate(this)
        }

        connectedCallback() {
            this._connected = true
            this.style.opacity = 1
            this.style.display = 'inline'
            enqueueTypeset(this)

            this.innerHTML = asciidoctor.convert(this._content, {safe: 'safe', attributes: 'icons=font'})
        }
    })

</script>