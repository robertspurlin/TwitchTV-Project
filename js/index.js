var channels = ["ESL_SC2", "OgamingSC2", "freecodecamp"];

$(document).ready(function() {
    getChannelInfo();

});

$("#search").keypress(function(e) {
    if (e.which == 13) {
        channels.push($("#search").val());
        getChannelInfo();
    }
});

$('body').on('click', '.remove', function(){
    var index = channels.indexOf(this.id);
    if (index > -1) {
        channels.splice(index, 1);
        getChannelInfo();
    }
});

var status, imageURL;

function getChannelInfo() {
    
    $('#box').empty();  
    
    channels.forEach(function(channel) {

        function makeURL(type, name) {
            return 'https://wind-bow.gomix.me/twitch-api/' + type + '/' + name + '?callback=?';
        };
       
        $.getJSON(makeURL("channels", channel), function(channelData) {
            
            $.getJSON(makeURL("streams", channel), function(streamData) {
               
                if (!channelData.error) {
                    if (streamData.stream !== null) {
                        status = "<a href='https://twitch.tv/" + channelData.name + "'target='_blank'>" + channelData.display_name + "</a> is online.</br>" + streamData.stream.channel.status;
                        
                        if (channelData.logo == null) {
                            imageURL = "https://placehold.it/300x300?text=_";
                        } else {
                            imageURL = channelData.logo;
                        }

                        $('#box').append(
                            "<div class='well' id='" + channel + "'style='background-color: #83f442;'><div class='row'><div class='col-xs-2'><img class='img-thumbnail remove' id='" + channel + "'src='" + imageURL +  "'/></div><div class='col-xs-10'><h5>" + status + "</h5></div></div></div>");
                    } else {
                        status = "<a href='https://twitch.tv/" + channelData.name + "'target='_blank'>" + channelData.display_name + "</a> is offline.";
                        
                        if (channelData.logo == null) {
                            imageURL = "https://placehold.it/300x300?text=_";
                        } else {
                            imageURL = channelData.logo;
                        }

                        $('#box').append(
                            "<div class='well' id='" + channel + "'><div class='row'><div class='col-xs-2'><img class='img-thumbnail remove' id='" + channel + "'src='" + imageURL +  "'/></div><div class='col-xs-10'><h5>" + status + "</h5></div></div></div>");
                    }
                } else {
                    status = channel + " does not exist.";
                    imageURL = "https://placehold.it/300x300?text=_";
                    
                        $('#box').append(
                            "<div class='well' id='" + channel + "' style='background-color: white;'><div class='row'><div class='col-xs-2'><img class='img-thumbnail remove' id='" + channel + "'src='" + imageURL +  "'/></div><div class='col-xs-10'><h5>" + status + "</h5></div></div></div>");
                }
            });
        });
    });
};

