
export default {
    loadingEls: [],
    loadingElsByRef: {},

    addLoadingEl(el, value, targetRef, remove) {
        if (targetRef) {
            if (this.loadingElsByRef[targetRef]) {
                this.loadingElsByRef[targetRef].push({el, value, remove})
            } else {
                this.loadingElsByRef[targetRef] = [{el, value, remove}]
            }
        } else {
            this.loadingEls.push({el, value, remove})
        }
    },

    setLoading(refs) {
        const refEls = refs.map(ref => this.loadingElsByRef[ref]).filter(el => el).flat()

        const allEls = this.loadingEls.concat(refEls)

        allEls.forEach(el => {
            if (el.remove) {
                el.el.classList.remove(el.value)
            } else {
                el.el.classList.add(el.value)
            }
        })

        return allEls
    },

    unsetLoading(loadingEls) {
        loadingEls.forEach(el => {
            if (el.remove) {
                el.el.classList.add(el.value)
            } else {
                el.el.classList.remove(el.value)
            }
        })
    },
}
