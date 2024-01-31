import React from 'react'
import { View, Text } from 'react-native'

import styles from './about.style'

const About = ({ item }) => {
  //console.log(item);
  const description = item.description;
  const salary = item.salary;
  const lastDate = item.expirationDate;
  const jobType = item.type;
  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.headText}>About the job:</Text>
        <View style={styles.contentBox}>
          <Text style={styles.contextText}>{description}</Text>
        </View>
      </View>
      <View style={styles.container}>
        <Text style={styles.headText}>Salary: <Text style={styles.contextText}>{salary}</Text></Text>
      </View>
      <View style={styles.container}>
        <Text style={styles.headText}>Expiration Date: <Text style={styles.contextText}>{lastDate}</Text></Text>
      </View>
      <View style={styles.container}>
        <Text style={styles.headText}>Job Type: <Text style={styles.contextText}>{jobType}</Text></Text>
      </View>
    </View>
  )
}

export default About;