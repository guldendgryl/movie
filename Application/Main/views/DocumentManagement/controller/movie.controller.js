sap.ui.define([
    "sap/ui/core/mvc/Controller",
    'sap/ui/model/Filter',], function (Controller, Filter){
        "use strict";
        var base;
        var next =true;
        var allRatedMovies = [];
        return Controller.extend("SapUI5Tutorial.Application.Main.views.DocumentManagement.controller.movie", {
            onInit: function () {
                base = this;
                this
                    .getView()
                    .setModel(oModel);
                $.ajax({
                    type: "GET",
                    url: 'https://raw.githubusercontent.com/FEND16/movie-json-data/master/json/top-rated-movies-02.json',
                    data: "",
                    dataType: 'json',
                    summary: "Official Trailer",
                    success: function (firstMovies) {
                        oModel.setProperty("/firstMovies", firstMovies);
                        var datas = oModel.getProperty("/firstMovies");
                        allRatedMovies = datas.filter(x => x.imdbRating >= 8.2).sort((a, b) => b.imdbRating - a.imdbRating).slice(0, 12)
                        console.log(allRatedMovies)
                        oModel.setProperty("/firstMovies", allRatedMovies);
                        var carousel = base.getView().byId("carouselId");
                        setTimeout(function () { carousel.next(); }, 300);
                    }
                })
                this
                    .getView()
                    .setModel(oModel);
                $.ajax({
                    type: "GET",
                    url: 'https://raw.githubusercontent.com/FEND16/movie-json-data/master/json/top-rated-indian-movies-01.json',
                    data: "",
                    dataType: 'json',
                    success: function (allMovies) {
                        oModel.setProperty("/allMovies", allMovies);
                    }
                })
            },


            pageChanged: function (oEvent) {
                var shouldToggle = oEvent.getParameters().activePages.find(x=>x==0 ||x==allRatedMovies.length-1)
                var carousel = base.getView().byId("carouselId");
                if(shouldToggle){
                    next=!next;
                    // carousel.setActivePage(carousel.pages(0));
                }
                if(next==true){
                    setTimeout(function () { carousel.next(); }, 2000);
                }
                else{
                    setTimeout(function () { carousel.previous(); }, 2000);
                }
               
            },
          

            

            // pageChanged: function (oEvent) {
            //     var activePagesIndexes = oEvent.getParameters().activePages;
            //     var carousel = base.getView().byId("carouselId");
            //     if(activePagesIndexes[0]==0 || activePagesIndexes[activePagesIndexes.length-1]==allRatedMovies.length-1){
            //         next=!next;
            //     }
            //     if(next==true){
            //         setTimeout(function () { carousel.next(); }, 300);
            //     }
            //     else{
            //         setTimeout(function () { carousel.previous(); }, 300);
            //     }
               
            // },
            

        //     onLoad:function(oEvent) {
        //         $(function() {
        //             $("#scroller").simplyScroll({
        //             autoMode: 'loop',
        //             width: 3000,
        //             startOnLoad: true
        //             });  
        //         })
        
        // },


            NewDialogPress: function (oEvent) {

                if (!this._oDialog) {

                    this._oDialog = sap
                        .ui
                        .xmlfragment("SapUI5Tutorial.Application.Main.views.DocumentManagement.view.movie", this);

                    this
                        .getView()
                        .addDependent(this._oDialog);
                }
                var dialog = oModel.getProperty(
                    oEvent.getSource().getBindingContext().getPath()
                )
                oModel.setProperty("/dialogview", dialog);
                this
                    ._oDialog
                    .open(oEvent.getSource());

            },

            onPress: function (oEvent) { //closebutton

                if (!this._oDialog) {

                    this._oDialog = sap
                        .ui
                        .xmlfragment("SapUI5Tutorial.Application.Main.views.DocumentManagement.view.movie", this);

                    this
                        .getView()
                        .addDependent(this._oDialog);
                }

                this
                    ._oDialog
                    .close(oEvent.getSource());
            },



            onSearchMovie: function (oEvent) {
                var searchText = oEvent.getSource().getValue();

                var oFilter = new Filter("title", sap.ui.model.FilterOperator.Contains, searchText);

                var listId = this.getView().byId("firstMoviesId");

                var filter = new Filter({ filters: [oFilter] })

                listId.getBinding("content").filter(filter, "Application");
            },




        });
    });