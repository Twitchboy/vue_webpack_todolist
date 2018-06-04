import '../assets/styles/footer.styl';

export default {
    data () {
        return {
            author: 'PyCoder Junting'
        }
    },
    render () {
        return (
            <div id="footer">
                <span>作者：{this.author}</span>
            </div>
        )
    }
}
